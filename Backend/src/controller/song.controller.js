const songModel = require("../model/song.model")
const id3 = require("node-id3")
const storageService = require("../services/storage.service")

async function uploadSong(req, res) {
    const songBuffer = req.file.buffer
    const { mood } = req.body
    const tags = id3.read(songBuffer)
    const uploadedBy = req.user.id



const [songFile, imageFile] = await Promise.all([

    storageService.uploadFile({
        buffer: songBuffer,
        filename: tags.title + ".mp3",
        folder: "/modify/songs"
    }),

    storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: tags.title + ".jpeg",
        folder: "/modify/posters"
    })

])

    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterUrl: imageFile.url,
        mood ,
        uploadedBy ,
         status: "pending"
    })



    res.status(201).json({
        message: "song created successfully",
        song
    })
}

async function getSong(req, res) {

    const { mood } = req.query

    const song = await songModel.aggregate([
        {
          $match: { mood, status: "approved" }
        },
        {
            $sample: { size: 1 }
        }
    ])

    if (!song.length) {
    return res.status(404).json({
        message: "No songs found for this mood"
    })
}

    res.status(200).json({
        message: "song fetched successfully",
        song: song[0]
    })
}


async function updateSongStatus(req, res) {
    try {
        const songId = req.params.songId
        const { status } = req.body

        const allowedStatus = ["approved", "rejected"]

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            })
        }

        const song = await songModel.findByIdAndUpdate(
            songId,
            { status },
            { new: true }
        )

        if (!song) {
            return res.status(404).json({
                message: "Song not found"
            })
        }

        return res.status(200).json({
            message: "Song status updated",
            song
        })

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}

async function getPlaylist(req, res) {
    try {
        const { mood } = req.query

        if (!mood) {
            return res.status(400).json({
                message: "Mood is required"
            })
        }

        const songs = await songModel.find({
            mood,
            status: "approved"
        })
        .sort({ createdAt: -1 })
        .limit(30)

        if (!songs.length) {
            return res.status(404).json({
                message: "No songs found for this mood",
                songs: []
            })
        }

        return res.status(200).json({
            message: "Playlist fetched successfully",
            songs
        })

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}



module.exports = {
    uploadSong,
    getSong,
    updateSongStatus,
    getPlaylist
}