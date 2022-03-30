const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const homeSchema = new Schema(
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
        pic_url:{
            type:String,
            required:false,
        },
        pic_id:{
            type:String,
            required:false,
        },
        pic:[],
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

const Home = mongoose.model("home_data", homeSchema, "home_data");
module.exports = Home;
