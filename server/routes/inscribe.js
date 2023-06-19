const express=require('express');
const router=express.Router();
const {User} =require('../models/users')
const {Inscribe}=require('../models/inscribe.js');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

router.post('/',async(req,res)=>{
    try {
    const userID=localStorage.getItem("id");
    const user= await User.findById(userID);

    if(!user){
        res.status(400).redirect(`${process.env.CLIENT_URL}signup`)
    }
    else{
        const post=new Inscribe({
            postId: user._id,
            UserName:user.name,
            UserImage: user.image,
            title:req.body.title,
            content:req.body.content,
            upcord: {},
            downcord:{},
            comments: [],
        });
        if(req.file){
            post.image.data=req.file.filename;
            post.image.contentType = 'image/png';
        }
        await post.save();
        const Post=await Inscribe.find();
        res.status(201).json(Post);
    }
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})
module.exports=router;