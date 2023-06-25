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
    res.sendFile(imagePath);
  });

  router.patch("/:id/upcord", async (req, res) => {
    try {
      const { id } = req.params;
      const { postId } = req.body; // Use "postId" instead of "postId"
  
      const post = await Inscribe.findById(id);
      const isupcorded = post.upcord.get(postId); // Use "postId" as the key
      const isdowncorded = post.downcord.get(postId); // Use "postId" as the key
  
      if (isupcorded) {
        post.upcord.delete(postId); // Use "postId" as the key
      } else if (isdowncorded) {
        post.downcord.delete(postId); // Use "postId" as the key
        post.upcord.set(postId, true); // Use "postId" as the key
      } else {
        post.upcord.set(postId, true); // Use "postId" as the key
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
        const { postId }  = req.body;
        const post = await Inscribe.findById(id);
        const isdowncorded = post.downcord.get(postId);
        const isupcorded= post.upcord.get(postId);

        if (isdowncorded) {
            post.downcord.delete(postId);
        }
        else if(isupcorded){
            post.upcord.delete(postId);
            post.downcord.set(postId, true);
        }
        else {
            post.downcord.set(postId, true);
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
        // const { postId }  = req.body;
    const user = await User.findById(req.body.senderid);

    const newComment = {
        senderid: req.body.senderid,
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
