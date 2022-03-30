const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        slug:{
            type:String,
            required:true,
            unique:true,
        },
        username:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
    },
    {timestamp:true}
);

const User = mongoose.model("adm", userSchema, "adm");
module.exports = User;