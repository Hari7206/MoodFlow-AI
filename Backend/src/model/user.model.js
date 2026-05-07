const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String ,
        required: [true , "username is required"],
        unique: [true , "this username is already taken"] 
    },
    email:{
        type: String ,
        required: [true , "email is required"],
        unique: [true , "this email is already taken"] 
    },
    password:{
        type: String ,
        required: [true , "password is required"],
       
    }
})

const userModel = mongoose.model("users" , userSchema)


module.exports = userModel