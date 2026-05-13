const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },

    posterUrl: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    mood: {
      type: String,
      enum: {
        values: ["happy", "sad", "surprised", "angry"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("songs", songSchema);

module.exports = Song;