const mongoose = require("mongoose")

const AboutSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:false,
        },
        pic:{
            type:String,
            required:false,
        },
        pic_id:{
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
    {
        timestamp:true
    }
)

module.exports = mongoose.model("pp", AboutSchema, "pp")