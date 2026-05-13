let express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
let adminMiddlware = require("../middleware/admin.middleware")
let songController = require("../controller/song.controller")

const router = express.Router()


router.patch(
  "/:songId/status",
   authMiddleware.authUser,
  adminMiddlware.isAdmin,
  songController.updateSongStatus
)

module.exports = router