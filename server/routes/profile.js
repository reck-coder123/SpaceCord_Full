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

router.patch('/:friendId/blink', async (req, res) => {
    try {
      const { friendId } = req.params;
      const { id } = req.body;


  
      const user = await User.findById(id);
      const isFriend = user.blinks.get(friendId);
  
      if (isFriend) {
        user.blinks.delete(friendId);
      } else {
        user.blinks.set(friendId, true);
      }
  
      // Update the `blinks` field of the `user` object
      user.blinks = new Map(user.blinks);
  
      const updatedBlink = await User.findByIdAndUpdate(
        id,
        { blinks: user.blinks },
        { new: true }
      );
  
      res.status(200).json(updatedBlink);
      console.log("blinked");
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  });
  

router.get('/:id/getFriends', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        // Retrieve the keys of the `user.blinks` map
        const friendList = Array.from(user.blinks.keys());

        res.status(200).json(friendList);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});


module.exports=router;