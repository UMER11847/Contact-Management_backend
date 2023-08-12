const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true, "pls add the username"]
    },
    email:{
        type: String,
        required:[true, "pls add the username"],
        unique:[true, "this email already exist"]     
    },
    password:{
        type: String,
        required:[true, "pls add the user password"]
   
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("user", userSchema) 