
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, token missing"
        });
    }


   const blacklisted = await redis.get(token)


    if(blacklisted){
        return res.status(401).json({
            message: "Invalid or expired token"
        })
    }
    
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }
}


module.exports = {
    authUser
}