const userModel = require("../model/user.model")

async function isAdmin(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const user = await userModel.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access only"
            })
        }

        next()

    } catch (err) {
        return res.status(500).json({
            message: "Server error",
            error: err.message
        })
    }
}
module.exports = 
{
    isAdmin

}