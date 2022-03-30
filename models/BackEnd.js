const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const backSchema = new Schema(
    {
        slug:{
            type:String,
            required:true,
            unique:true,
        },
        pic_url:{
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
);

const BackEnd = mongoose.model("bed_data", backSchema, "bed_data");
module.exports = BackEnd;
