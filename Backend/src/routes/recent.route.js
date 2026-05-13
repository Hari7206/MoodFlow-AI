const express = require("express")
const recentController = require("../controller/recent.controller")
const authMiddleware = require("../middleware/auth.middleware")
const router = express.Router()


router.post("/:songId" ,  authMiddleware.authUser , recentController.addRecentSong)
router.get("/" ,  authMiddleware.authUser , recentController.getRecentSong)



module.exports = router