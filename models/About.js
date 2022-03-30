const mongoose = require("mongoose")

const AboutSchema = new mongoose.Schema(
    {
        slug:{
            type:String,
            required:true,
            unique:true,
        },
        desc:{
            type:String,
            required:false,
        },
        createdAt:{
            type:Date,
            required:false,
        },
        updatedAt:{
            type:Date,
            required:false,
        },
    },
    {timestamp:true}
)

module.exports = mongoose.model("about_data", AboutSchema, "about_data")