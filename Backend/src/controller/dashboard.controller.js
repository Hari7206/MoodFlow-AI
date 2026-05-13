
const userModel = require("../model/user.model")
const songModel = require("../model/song.model")
const recentSongModel = require("../model/recentSong.model")



async function getDashboard(req, res) {
    const user = req.user.id

    const [userData, uploads, recent] = await Promise.all([
        userModel.findById(user).select("-password"),
        songModel.find({ uploadedBy: user })
            .sort({ createdAt: -1 })
            .limit(10),
        recentSongModel.find({ user })
            .populate("song")
            .sort({ createdAt: -1 })
            .limit(10)
    ])

    return res.status(200).json({
        user: userData,
        uploads,
        recent
    })
}

module.exports = {
    getDashboard
}

