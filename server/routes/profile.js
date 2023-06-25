const {User}=require('../models/users');
const {Inscribe}=require("../models/inscribe");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');
const express=require('express');
const path=require('path');

const router = express.Router();

// router.get("/", async(req,res)=>{
//     try {
//         const id=localStorage.getItem("id");
//         const user= await User.findById(id);
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error);
//         res.status(404).json({ message: error.message });
//     }
// })

router.get("/fullData",async(req,res)=>{
    try {
        const user=await User.find();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
})



router.get("/:id", async(req,res)=>{
    try {
        const { id } = req.params;
        const user= await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
})





router.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../public/assets', filename);
    res.sendFile(imagePath);
  });

router.get('/:id/posts',async(req,res)=>{
    try {
        const { id } = req.params;
        // console.log(id);
        const Userpost=await Inscribe.find({postId:id})
        res.status(202).json(Userpost);
    } catch (error) {
        console.log(error);
        res.status(404).json({message:error.message})
    }
})

module.exports=router;