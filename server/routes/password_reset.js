const router = require("express").Router();
const { User } = require("../models/users");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

// send password link
router.post("/", async (req, res) => {
	try {
		

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;
		await sendEmail(user.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log(error);
	}
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log(error);
	}
});

//  set new password
router.post("/:id/:token", async (req, res) => {
	try {

		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });
		const { password, confirmpassword } = req.body;
		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		if (!user.verified) user.verified = true;
		console.log(confirmpassword);
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(password, salt);
		const hashCPassword = await bcrypt.hash(confirmpassword, salt);

		if(hashPassword===hashCPassword){
			await User.updateOne({_id: user._id},{
                $set:{
                    password:hashPassword,
                    Confirmpassword:hashCPassword  
                }
            });
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
		}
		else{
			res.status(400).send({message:"Passwords are not matching"});
	
		}
		
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
		console.log(error);
	}
});

module.exports = router;
