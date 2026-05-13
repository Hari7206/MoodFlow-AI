const express = require("express")
const upload = require("../middleware/upload.middlware")
const authMiddleware = require("../middleware/auth.middleware")
const authController = require("../controller/user.controller")

const router = express.Router()
router.patch(
  "/update",
  authMiddleware.authUser,
  upload.single("profilePic"),
  authController.updateUser
)

module.exports = router
