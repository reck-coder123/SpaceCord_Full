const express=require('express')
const router=express.Router();
const {User} = require("../models/users");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

router.post('/',async(req,res)=>{
    try {
        const id=localStorage.getItem("id");
        const { city,college,startyear,completeyear,course,branch } = req.body;

        const user=await User.findOneAndUpdate({_id:id},{city,college,startyear,completeyear,course,branch},{new:true});

        if(req.file){
            
            user.image.data=req.file.filename;
            user.image.contentType = 'image/png';
            await user.save().then(()=>
            console.log('image uploaded')
            ).catch(err=>console.log(err));
        }
        
        if(!user){
            return res.redirect(`${process.env.CLIENT_URL}signup`);
        }
        
        
        
        res.send(user);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error");
    }
})
module.exports = router;