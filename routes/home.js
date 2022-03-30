const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const Home = require("../models/Home");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");


//CreateHomecc
router.post("/", upload.single('image'), async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // const newHome = new Home(req.body);
    try{
        const uploadpp = await cloudinary.uploader.upload(req.file.path)
        const newHome = new Home({
            slug: "Home-"+Math.floor(Math.random() * 1000 + 1)
            +"-"+Math.floor(Math.random() * 1000 + 1)
            +"-"+Math.floor(Math.random() * 1000 + 1),
            desc: req.body.desc,
            pic_url: uploadpp.secure_url,
            pic_id: uploadpp.public_id,
            pic: uploadpp,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newHome.save();
        res.status(200).json(newHome)
    }catch(err){
        res.status(500).json(err + "Meowww")
    }
})

//UpdateDBcc
// router.put("/:id", upload.single('image'),async (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     try{
//         const home = await Home.findById(req.params.id);
//         const uploadpp = await cloudinary.uploader.upload(req.file.path)
//         const updatedHome = await Home.findByIdAndUpdate(
//             req.params.id,
//             {
//                 desc: req.body.desc,
//                 pic_url: uploadpp.secure_url,
//                 pic_id: uploadpp.public_id,
//                 pic: uploadpp,
//                 updatedAt: new Date()
//             },
//             {new: true}
//             );
//             res.status(200).json(updatedHome);
//     }catch(err){
//         res.status(500).json(err);
//     }
// })

//UpdateDBSlugcc
router.put("/:slug", upload.single('image'),async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try{
        const home = await Home.findOne({slug: req.params.slug});
        // let picture = req.file.path;
        // if(picture === null) return res.status(400).json({ message: "No picture Added"});
        if(!req.file){
            // const uploadpp = await cloudinary.uploader.upload(req.file.path)
            const updatedHome = await Home.findOneAndUpdate(
                {slug:req.params.slug},
                {
                    desc: req.body.desc,
                    // pic_url: uploadpp.secure_url,
                    // pic_id: uploadpp.public_id,
                    // pic: uploadpp,
                    updatedAt: new Date()
                },
                {new: true}
                );
            res.status(200).json(updatedHome);
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
            res.status(200).json(updatedHome);
        }
    }catch(err){
        res.status(500).json(err);
    }
})

//showcc
router.get("/", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const home = await Home.find();
        res.status(200).json(home);    
    }catch(err){
        res.status(500).json(err);
    }
});

//showOnecc
// router.get("/:id", async (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     try {
//         const home = await Home.findById(req.params.id);
//         res.status(200).json(home);    
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

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