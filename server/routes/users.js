const router = require("express").Router();
const { User } = require("../models/users.js");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt=require('bcrypt');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');


router.post('/',async(req,res)=>{
    try {
        
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(409).send({message:"User exists already"});
        }
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;
       if(password===cpassword){
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
        const hashCpassword= await bcrypt.hash(req.body.confirmpassword,salt);
            const user=new User({
                name:req.body.name,
                password:hashPassword,
                email:req.body.email,
                mobile:req.body.mobile,
                confirmpassword:hashCpassword,
            })
            // console.log(user._id.toString());
            const tokenA= await user.generateauthToken();
            res.cookie("jwt",tokenA,{
                expires:new Date(Date.now()+500000),
                httpOnly:true
            })
            const registered=await user.save();
            localStorage.setItem("id",user._id.toString());
            localStorage.setItem("name",user.name);
            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
            const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
            await sendEmail(user.email, "Verify Email", url);
    
            res
                .status(201)
                .send({ message: "An Email sent to your account please verify" });
        }
        
        else{
            return res.status(400).send({message:'passwords are not matching'});
        }
            
    } catch (error) {
        res.status(500).send({message:'internal server error'});
        console.log(error);
    }
})

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({_id: user._id},{
            $set:{
                isverified:true  
            }
        });
		await token.remove();
		// res.status(200).send({ message: "Email verified successfully" });
        res.redirect(`${process.env.CLIENT_URL}signup/educationdetails`);
	} catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
        
	}
});

module.exports = router;

