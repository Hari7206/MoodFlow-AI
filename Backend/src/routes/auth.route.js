const {Router} = require("express")
const authController = require("../controller/user.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = Router()

router.post("/register" , authController.registerUser)

router.post("/login" , authController.loginUser)



//  this for getting user details 
router.get("/get-me" , authMiddleware.authUser , authController.getMe)



//  this we will use for the logout
router.get("/logout" , authMiddleware.authUser , authController.logoutUser)






module.exports = router