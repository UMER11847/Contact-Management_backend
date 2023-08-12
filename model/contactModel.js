const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "pls add the contact name"]
  },
  email:{
    type: String,
    require: [true, "pls add the contact email"]
  },
  phone:{
    type: String,
    require: [true, "pls add the contact phone-no"]
  }
},
{
    timestamps: true,
}) 

module.exports = mongoose.model("contact", contactSchema);