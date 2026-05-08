const mongoose = require("mongoose")


const blacklistTokenSchema = mongoose.Schema({
    token: {
        type: String ,
        required: [true , "token is required for blacklisting"]
    }
}, {
    timestamps: true
})

const blacklistTokenModel = mongoose.model("blacklist" , blacklistTokenSchema)



module.exports = blacklistTokenModel