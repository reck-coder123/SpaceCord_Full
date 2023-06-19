const express = require('express');
const path=require('path')
const router = express.Router();
const { User } = require('../models/users')
const { Inscribe } = require('../models/inscribe');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');


router.get("/", async (req, res) => {
    try {
        const post = await Inscribe.find();
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

router.get('/image/:filename', (req, res) => {
    
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../public/assets', filename);
    console.log(imagePath);
    res.sendFile(imagePath);
  });

router.patch("/:id/upcord", async (req, res) => {
    try {
        const { id } = req.params;
        const userID = localStorage.getItem("id");
        const post = await Inscribe.findById(id);
        const isupcorded = post.upcord.get(userID);
        const isdowncorded = post.downcord.get(userID);

        if (isupcorded) {
            post.upcord.delete(userID);
        } else if (isdowncorded) {
            post.downcord.delete(userID);
            post.upcord.set(userID, true);
        } else {
            post.upcord.set(userID, true);
        }

        const updatedPost = await Inscribe.findByIdAndUpdate(
            id,
            { upcord: post.upcord, downcord: post.downcord },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});



router.patch("/:id/downcord", async (req, res) => {
    try {
        const { id }  = req.params;
        const userID  = localStorage.getItem("id");
        const post = await Inscribe.findById(id);
        const isdowncorded = post.downcord.get(userID);
        const isupcorded= post.upcord.get(userID);

        if (isdowncorded) {
            post.downcord.delete(userID);
        }
        else if(isupcorded){
            post.upcord.delete(userID);
            post.downcord.set(userID, true);
        }
        else {
            post.downcord.set(userID, true);
        }

        const updatedPost = await Inscribe.findByIdAndUpdate(
            id,
            { downcord: post.downcord, upcord: post.upcord },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
})

router.post("/:id/comment", async (req, res) => {
    try {
        const { id } = req.params;
    const userID = localStorage.getItem("id");
    const user = await User.findById(userID);

    const newComment = {
        senderid: user._id,
        senderName: user.name,
        comment: req.body.comment
    };
    const postcomment = await Inscribe.findByIdAndUpdate(
        { _id: id },
        { $push: { comments: newComment } },
        { new: true }
    );
    console.log("comment added");
    res.status(202).json(postcomment);
    } catch (error) {
        console.log(error)
        res.status(404).json({message:error.message});
    }
})



module.exports=router;
