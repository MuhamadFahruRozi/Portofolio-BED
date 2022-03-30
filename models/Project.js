const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema(
    {
        slug:{
            type:String,
            required:true,
            unique:true,
        },
        project_id:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        thumbImg_id:{
            type:String,
            required:true,
        },
        thumbImg_url:{
            type:String,
            required:true,
        },
        gitAdress:{
            type:String,
            required:false,
        },
        adress:{
            type:String,
            required:false,
        },
        desc:{
            type:String,
            required:true,
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

module.exports = mongoose.model("project_data", ProjectSchema, "project_data")