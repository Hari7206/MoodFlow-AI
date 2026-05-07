const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")



async function registerUser(req, res) {
    const { username, email, password } = req.body


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
        password: hash
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
    const { email, password, username } = req.body


    const user = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

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

    res.cookie("token", token)


    return res.status(200).json({
        message: "user log in successfully" ,
        user: {
            id: user._id,
            username: user.username ,
            email: user.email
        }
    })


}

module.exports = {
    registerUser ,
    loginUser
}
