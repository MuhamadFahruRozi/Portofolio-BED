const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Home = require("../models/Home");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

//UpdateDBSlugcc
router.put("/:slug", upload.single('image'),async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const home = await Home.findOne({slug: req.params.slug});
        if(!req.file){
            const updatedHome = await Home.findOneAndUpdate(
                {slug:req.params.slug},
                {
                    desc: req.body.desc,
                    updatedAt: new Date()
                },
                {new: true}
                );
            res.status(200).json("Home Updated!");
        }else{
            const uploadpp = await cloudinary.uploader.upload(req.file.path)
            const updatedHome = await Home.findOneAndUpdate(
                {slug:req.params.slug},
                {
                    desc: req.body.desc,
                    pic_url: uploadpp.secure_url,
                    pic_id: uploadpp.public_id,
                    pic: uploadpp,
                    updatedAt: new Date()
                },
                {new: true}
                );
            res.status(200).json("Home Updated!");
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//showOneSlugcc
router.get("/:slug", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const slug = req.params.slug
        const home = await Home.findOne({"slug":slug});
        res.status(200).json(home);    
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;