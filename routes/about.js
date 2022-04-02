const express = require("express");
const About = require("../models/About");
const Fed = require("../models/FrontEnd");
const Bed = require("../models/BackEnd");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");
const router = express.Router();

//CreateFEDcc
router.post("/fed", upload.array('image'), async (req, res) => {
    try{
        let pictures = req.files;
        if(!pictures)
            return res.status(400).json({ message: "No picture Added"});

        let multipleupload = pictures.map(async (picture) => {
            try{
                const slug = "FED-"+Math.floor(Math.random() * 1000 + 1)
                +"-"+Math.floor(Math.random() * 1000 + 1)
                +"-"+Math.floor(Math.random() * 1000 + 1);
                const uploadFed = await cloudinary.uploader.upload(picture.path)
                const newFed = new Fed({
                    slug: slug,
                    pic_url: uploadFed.secure_url,
                    pic_id: uploadFed.public_id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                await newFed.save();
            }catch(err){
                res.status(500).json(err)        
            }
        })
        res.status(200).json("Front-End Skills Added")
    }catch(err){
        res.status(500).json(err)
    }
})

//CreateBEDcc
router.post("/bed", upload.array('image'), async (req, res) => {
    try{
        let pictures = req.files;
        if(!pictures)
            return res.status(400).json({ message: "No picture Added"});

        let multipleupload = pictures.map(async (picture) => {
            try{
                const slug = "BED-"+Math.floor(Math.random() * 1000 + 1)
                +"-"+Math.floor(Math.random() * 1000 + 1)
                +"-"+Math.floor(Math.random() * 1000 + 1);
                const uploadBed = await cloudinary.uploader.upload(picture.path)
                const newBed = new Bed({
                    slug: slug,
                    pic_url: uploadBed.secure_url,
                    pic_id: uploadBed.public_id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                await newBed.save();
            }catch(err){
                res.status(500).json(err)        
            }
        })
        
        res.status(200).json("Back-End Skills Added")
    }catch(err){
        res.status(500).json(err)
    }
})

//showafed
router.get("/fed", async (req, res) => {
    try {
        const fed = await Fed.find();
        res.status(200).json(fed);    
    }catch(err){
        res.status(500).json(err);
    }
});

//showabed
router.get("/bed", async (req, res) => {
    try {
        const bed = await Bed.find();
        res.status(200).json(bed);    
    }catch(err){
        res.status(500).json(err);
    }
});


//showaboutoneSlug
router.get("/:slug", async (req, res) => {
    // res.set('Access-Control-Allow-Origin', '*');
    try {
        const about = await About.findOne({slug:req.params.slug});
        const fed = await Fed.find();
        const bed = await Bed.find();
        res.status(200).json({about, fed, bed});    
    }catch(err){
        res.status(500).json(err);
    }
});

//Updateabout
router.put("/:slug", upload.single(),async (req, res) => {
    try{
        const about = await About.findOne({slug: req.params.slug});
        const updatedAbout = await About.findOneAndUpdate(
            {slug: req.params.slug},
            {
                desc: req.body.desc,
                updatedAt: new Date()
            },
            {new: true}
            );
            res.status(200).json("About Updated!");
    }catch(err){
        res.status(500).json(err);
    }
})

//DeleteFED
router.delete("/fed/:slug", async (req, res) => {  
    try{
        const fed = await Fed.findOne({slug: req.params.slug});
        await cloudinary.uploader.destroy(`${fed.pic_id}`);
        await Fed.deleteOne({_id: fed._id});
    
        res.status(200).json("Skill "+fed.slug+" Deleted")
        // res.status(200).json(fed)
    }catch(err){
        res.status(500).json(err)
    }
})

//DeleteBED
router.delete("/bed/:slug", async (req, res) => {  
    try{
        const bed = await Bed.findOne({slug: req.params.slug});
        await cloudinary.uploader.destroy(`${bed.pic_id}`);
        await Bed.deleteOne({_id: bed._id});
    
        res.status(200).json("Skill "+bed.slug+" Deleted")
        // res.status(200).json(bed)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;