require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const path=require('path');
const bodyparser=require('body-parser');
const db=require('./db/db');
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const passwordResetRoutes = require("./routes/password_reset");
const multer=require('multer');
const edutionaldetailsroutes=require("./routes/sign1");
const inscriberoutes=require("./routes/inscribe");
const profile=require('./routes/profile');
const update_profile=require('./routes/update_profile');
const Feeds=require('./routes/feeds');
//connecting to database
db();

//middleware
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization'
    ]
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Other middleware and routes go here...


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

  // routes
app.use("/api/users", userRoutes);
app.use("/api/users/educationdetails",upload.single("image"),edutionaldetailsroutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/inscribe",upload.single("image"),inscriberoutes);
app.use("/api/profile",profile)
app.use("/api/profile/update_profile",upload.single("image"),update_profile);
app.use("/api/posts",Feeds)

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));

