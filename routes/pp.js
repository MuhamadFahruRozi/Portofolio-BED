const express = require("express");
const router = express.Router();
const Pp = require("../models/Pp")
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")

//CreatePP
router.post("/",upload.single('image'), async (req, res) => {
    try{
        const uploadpp = await cloudinary.uploader.upload(req.file.path)
        const newTes = new Pp({
            title: req.body.title,
            pic: uploadpp.secure_url,
            pic_id: uploadpp.public_id,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newTes.save();
        res.status(200).json(newTes)
    }catch(err){
        res.status(500).json(err + "Meowww")
    }
})

//UpdateDB
router.put("/:id", async (req, res) => {
    try{
        const Pp = await Pp.findById(req.params.id);
        const updatedPp = await Pp.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
            );
            res.status(200).json(updatedPp);
    }catch(err){
        res.status(500).json(err);
    }
})

require('dotenv').config();
//show
router.get("/", (req, res) => {
    // res.status(200).send('menowww')
    res.status(200).send({
        title: 'Home API',
        isi: 'This Is Home From API Babyyy',
        dd: process.env.C_API_KEY
    });
});

module.exports = router;