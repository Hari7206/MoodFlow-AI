const mongoose = require("mongoose")
// user schema
const userSchema = mongoose.Schema({
    username:{
        type: String ,
           trim: true,
        required: [true , "username is required"],
        unique: [true , "this username is already taken"] 
    },
    email:{
        type: String ,
           trim: true,
        lowercase: true,
        required: [true , "email is required"],
        unique: [true , "this email is already taken"] 
    },
    password:{
        type: String ,
        required: [true , "password is required"],
        select: false
       
    },

    name: {
      type: String,
      default: "" ,
      trim: true
    },
    bio: {
      type: String,
      default: "",
      maxlength: 200,
    },

    profilePic: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    interests: {
      type: [String],
      default: ["happy"],
    },
} ,  {
    timestamps: true,
  })

const userModel = mongoose.model("users" , userSchema)


module.exports = userModel