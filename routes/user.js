const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken")

//showcc
router.get("/login", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const user = await User.find();
        res.status(200).json(user);    
    }catch(err){
        res.status(500).json(err);
    }
});

//login
router.post("/login", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const user = await User.find();

        // if(user){
        //     const token = jwt.sign(
        //         {
        //             username: user.username,
        //             password: user.password,
        //         },
        //         "infdivcarscigauhadhelfandeaspi"
        //     )
        // }
        res.status(200).json({status: "logged in",user: token});    
    }catch(err){
        res.status(500).json({status: "user not found",user: false});
    }
});

//showOnecc
router.get("/:slug", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const user = await User.findOne({slug: req.params.slug});
        res.status(200).json(user);    
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;