const express=require('express')
const router=express.Router();
const {User} = require("../models/users");
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

router.post('/',async(req,res)=>{
    try {
        const id=localStorage.getItem("id");
        const { name,password,confirmpassword,email,mobile,city,college,startyear,completeyear,course,branch,bio,domains,describe,experience,skills } = req.body;

        const user=await User.findOneAndUpdate({_id:id},{name,password,confirmpassword,email,mobile,city,college,startyear,completeyear,course,branch,bio,domains,describe,experience,skills},{new:true});

        if(req.file){
            
            user.image.data=req.file.filename;
            user.image.contentType = 'image/png';
            await user.save().then(()=>
            console.log('image changed')
            ).catch(err=>console.log(err));
        }
        
        if(!user){
            return res.redirect(`${process.env.CLIENT_URL}signup`);
        }
        
        
        console.log("profile updated");
        res.json(user,{msg:"Profile updated"});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error");
    }
})
module.exports = router;