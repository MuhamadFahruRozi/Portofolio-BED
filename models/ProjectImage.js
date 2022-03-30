const mongoose = require("mongoose")

const ProjectImageSchema = new mongoose.Schema(
    {
        slug:{
            type:String,
            required:true,
            unique:true,
        },
        project_id:{
            // type:mongoose.Schema.Types.ObjectId,
            type:String,
            required:true,
        },
        pic_url:{
            type:String,
            required:true,
        },
        pic_id:{
            type:String,
            required:true,
        },
        createdAt:{
            type:Date,
            required:false,
        }
    },
    {timestamp:true}
)

module.exports = mongoose.model("project_image", ProjectImageSchema, "project_image")