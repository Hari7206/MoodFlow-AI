const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const storageService = require("../services/storage.service")
const blacklistTokenModel = require("../model/blacklist.model")
const redis = require("../config/cache")




async function registerUser(req, res) {
    const { username, email, password, name, bio, interests, profilePic } = req.body


    const isUserAlreadyExsist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyExsist) {
        return res.status(409).json({
            message: "user already exsist can't register again "
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        name: name || "",
        bio: bio || "",
        profilePic: profilePic || undefined,
        interests: interests || ["happy"]
    })


    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("token", token)


    return res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email
    })
}


async function loginUser(req, res) {
    const { identifier, password } = req.body


    const user = await userModel.findOne({
        $or: [
            { email: identifier },
            { username: identifier }
        ]
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPassswordValid = await bcrypt.compare(password, user.password)

    if (!isPassswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }


    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false
    })


    return res.status(200).json({
        message: "user log in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
            bio: user.bio,
            profilePic: user.profilePic,
            role: user.role,
            interests: user.interests
        }
    })


}


async function getMe(req, res) {
    const user = await userModel.findById(req.user.id).select("-password")

    if (!user) {
    return res.status(404).json({
        message: "User not found"
    })
}

    res.status(200).json({
        message: "User fetched successfully",
        user
    })
}


async function logoutUser(req, res) {
    const token = req.cookies.token

    if (!token) {
    return res.status(401).json({
        message: "Unauthorized"
    })
}


    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "EX", 60 * 60 * 24 * 3)


    res.status(200).json({
        message: "logout succesfully"
    })

}



async function updateUser(req, res) {
    try {
        const userId = req.user.id

        const updateData = {}

        if (req.body.name) {
            updateData.name = req.body.name
        }

        if (req.body.bio) {
            updateData.bio = req.body.bio
        }

        if (req.body.interests) {
            updateData.interests = req.body.interests
        }

        // PROFILE IMAGE (only if file sent)
        if (req.file) {
            const uploaded = await storageService.uploadFile({
                buffer: req.file.buffer,
                filename: "profile-" + userId,
                folder: "/modify/profiles"
            })

            updateData.profilePic = uploaded.url
        }

        // If user sends nothing
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No data provided to update"
            })
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password")

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        })

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}

module.exports = {
    updateUser
}





module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser ,
    updateUser
}
