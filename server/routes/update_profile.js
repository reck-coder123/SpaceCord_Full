const express = require('express');
const router = express.Router();
const { User } = require("../models/users");
const {Inscribe}= require("../models/inscribe");

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {  name, password, confirmpassword, email, mobile, city, college, startyear, completeyear, course, branch, bio, domains, describe, experience, skills } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: id },
      { name, password, confirmpassword, email, mobile, city, college, startyear, completeyear, course, branch, bio, domains, describe, experience, skills },
      { new: true }
    );

    if (req.file) {
      user.image.data = req.file.filename;
      user.image.contentType = 'image/png';
      await user.save().then(() =>
        console.log('image changed')
      ).catch(err => console.log(err));
    }

    if (!user) {
      return res.redirect(`${process.env.CLIENT_URL}signup`);
    }

    const newpostdetails = await Inscribe.updateMany(
      { postId: id },
      { UserName: name, UserImage: user.image }
    );
    
    const updatedPosts = await Inscribe.find({ postId: id });
    

   

    console.log("profile updated");
    res.status(200).json({ user,updatedPosts, msg: "Profile updated" });

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error");
  }
});

module.exports = router;
