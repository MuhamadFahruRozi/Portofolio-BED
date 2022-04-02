const express = require("express");
const Project = require("../models/Project");
const ProjectImage = require("../models/ProjectImage")
const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")
const destroy = require("../utils/multer")
const router = express.Router();

//CreateProject
router.post("/", upload.fields([{name:'thumbImg'},{name:'images'}]), async (req, res) => {
    try{
        //project
        const slug = "PROJECT-"+Math.floor(Math.random() * 10000 + 1)    
                    +"-"+Math.floor(Math.random() * 10000 + 1)
                    +"-"+Math.floor(Math.random() * 10000 + 1);
                    +"-"+Math.floor(Math.random() * 10000 + 1);
                    +"-"+Math.floor(Math.random() * 10000 + 1);
        const uploadup = await cloudinary.uploader.upload(req.files['thumbImg'][0].path);
        const newProject = new Project({
            slug: slug,
            project_id: req.body.project_id,
            title: req.body.title,
            thumbImg_id:uploadup.public_id,
            thumbImg_url:uploadup.secure_url,
            gitAdress: req.body.gitAdress,
            adress: req.body.adress,
            desc: req.body.desc,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newProject.save();
        //pic
        let pictures = req.files['images'];
        if(!pictures)
            return res.status(400).json({ message: "No picture Added"});

        let multipleupload = pictures.map(async (picture) => {
            try{
                const slugImage = "PROJECT-"+Math.floor(Math.random() * 10000 + 1)    
                                +"-IMAGE-"+Math.floor(Math.random() * 10000 + 1)
                                +"-PREVIEW-"+Math.floor(Math.random() * 10000 + 1);
                const uploadpp = await cloudinary.uploader.upload(picture.path);
                const newProjectImage = new ProjectImage({
                slug: slugImage,
                project_id: req.body.project_id,
                pic_url: uploadpp.secure_url,
                pic_id: uploadpp.public_id,
                createdAt: new Date(),
                updatedAt: new Date()
                });
                await newProjectImage.save();
            }catch(err){
                res.status(500).json(err)        
            }
        })
        res.status(200).json("Project "+req.body.title+" Added")
    }catch(err){
        res.status(500).json(err)
    }
})

//Update
router.put("/:slug", upload.single('thumbImg'),async (req, res) => {
    try{
        if(!req.file){
            const updatedProject = await Project.findOneAndUpdate(
                {slug:req.params.slug},
                {
                    title: req.body.title,
                    gitAdress: req.body.gitAdress,
                    adress: req.body.adress,
                    desc: req.body.desc,
                    updatedAt: new Date()
                },
                {new: true}
            );
            res.status(200).json("Project Updated!");
        }else{
            const project = await Project.findOne({slug:req.params.slug});
            await cloudinary.uploader.destroy(`${project.thumbImg_id}`);
            const uploadpp = await cloudinary.uploader.upload(req.file.path)
            const updatedProject = await Project.findOneAndUpdate(
                {slug:req.params.slug},
                {
                    title: req.body.title,
                    gitAdress: req.body.gitAdress,
                    adress: req.body.adress,
                    desc: req.body.desc,
                    thumbImg_url: uploadpp.secure_url,
                    thumbImg_id: uploadpp.public_id,
                    updatedAt: new Date()
                },
                {new: true}
            );
            res.status(200).json("Project Updated!");
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// showcc
router.get("/", async (req, res) => {
    try{
        const showAll = await Project.find().sort({updatedAt: "descending"});
            res.status(200).json(showAll)
        }catch(err){
            res.status(500).json(err)
        }
});

//showOnecc
router.get("/:slug", async (req, res) => {
    try{
        const pro = await Project.findOne({slug: req.params.slug})
        const img = await ProjectImage.find({project_id: pro.project_id})
            res.status(200).json({Project: pro, Image: img})
        }catch(err){
            res.status(500).json(err)
        }
})
    
//delete
router.delete("/:slug", async (req, res) => {  
    try{
        const pro = await Project.findOne({slug: req.params.slug})
        const img = await ProjectImage.find({project_id: pro.project_id})
        const del = img.map(async (pic) => {
            await cloudinary.uploader.destroy(`${pic.pic_id}`);
            await ProjectImage.deleteOne({project_id: pic.project_id});
        })
        await cloudinary.uploader.destroy(`${pro.thumbImg_id}`);
        await Project.deleteOne({_id: pro._id})
        
        res.status(200).json("Project "+pro.title+" Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;