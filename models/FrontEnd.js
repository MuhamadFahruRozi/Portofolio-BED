const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const frontSchema = new Schema(
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

const FrontEnd = mongoose.model("fed_data", frontSchema, "fed_data");
module.exports = FrontEnd;
