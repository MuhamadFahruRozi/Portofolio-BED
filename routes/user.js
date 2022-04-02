const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken")

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