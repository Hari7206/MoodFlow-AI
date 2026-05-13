let mongoose = require("mongoose")


const recentSongSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "songs",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



const recentSongModel =  mongoose.model("recentSongs", recentSongSchema)

module.exports = recentSongModel;