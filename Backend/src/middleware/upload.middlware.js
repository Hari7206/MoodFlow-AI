const multer = require("multer")

const storage = multer.memoryStorage()

const upload =  multer({
    storage: storage ,
    limits: {
        fileSize: 1024 * 1024 * 10   // max 10 mb file we can get 
    }
})

module.exports = upload