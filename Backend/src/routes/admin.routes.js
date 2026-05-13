const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/admin.middleware")
const songController = require("../controller/song.controller")

const router = express.Router()

router.patch(
  "/:songId/status",
  authMiddleware.authUser,
  adminMiddleware.isAdmin,
  songController.updateSongStatus
)

router.get(
  "/pending",
  authMiddleware.authUser,
  adminMiddleware.isAdmin,
  songController.getPendingSongs
)

module.exports = router