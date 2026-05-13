const express = require("express")
const upload = require("../middleware/upload.middlware")
const authMiddleware = require("../middleware/auth.middleware")

const songController = require("../controller/song.controller")

const router = express.Router()


router.post("/" , authMiddleware.authUser , upload.single("song") ,  songController.uploadSong)
router.get("/"  , songController.getSong)

router.get("/playlist", authMiddleware.authUser, songController.getPlaylist)

module.exports = router
