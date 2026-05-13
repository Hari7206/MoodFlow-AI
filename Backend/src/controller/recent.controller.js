const recentSongModel = require("../model/recentSong.model")



async function addRecentSong(req, res) {
    const user = req.user.id
    const recentSong = req.params.songId
    await recentSongModel.deleteOne({ user, song: recentSong })
    


    const recentEntry  = await recentSongModel.create({
        user,
        song: recentSong
    });


    const songs = await recentSongModel
        .find({ user })
        .sort({ createdAt: -1 });

   

    if (songs.length > 10) {
       const  extraSongs = songs.slice(10);
        const ids = extraSongs.map(s => s._id);
        await recentSongModel.deleteMany({
            _id: { $in: ids }
        })
    }

    return res.status(201).json({
        message: "Recent song added",
        recent: recentEntry
    })




}

async function getRecentSong(req,res){

    const user = req.user.id

    const recentSongs = await recentSongModel
        .find({ user })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("song")

    return res.status(200).json({
        message: "Recent songs fetched",
        recent: recentSongs
    })
}


module.exports = {
    addRecentSong ,
    getRecentSong
}