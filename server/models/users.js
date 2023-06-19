// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// // const joi =require('joi');
// // const passwordComplexity = require("joi-password-complexity");


// const userSchema = new mongoose.Schema({
// 	name: { type: String ,},
// 	email: { type: String ,},
//     mobile:{type: Number},
// 	password: { type: String , },
// 	Confirm_password: { type: String , },
// 	verified: { type: Boolean, default: false },
// });

// // userSchema.pre("save",async function(next){
// //     // 
// //     if(this.isModified("password")){
// //     this.password=  bcrypt.hash(this.password, Number(process.env.SALT))
// //     this.Confirmpassword= bcrypt.hash(this.Confirmpassword, Number(process.env.SALT));
// // }
    
// //     next();
// // })
// userSchema.methods.generateauthToken=async function(){
//     try {
//         const token =jwt.sign({_id:this._id.toString()},process.env.JWTSECRETKEY);
//         this.tokens=this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     } catch (error) {
        
//         console.log('the error part'+error);
//     }
// }
// const User= new mongoose.model('User',userSchema)
// // const validate = (data) => {
// // 	const schema = joi.object({
// // 		name: joi.string().required().allow(null).label("name"),
// // 		email: joi.string().email().allow(null).required().label("email"),
// //         mobile:joi.number().integer().optional().label("mobile"),
// // 		password: passwordComplexity().allow(null).required().label("password"),
// //         Confirm_password:passwordComplexity().allow(null).required().label("Confirm_password"),
// // 	});
// // 	return schema.validate(data);
// // };




// module.exports={User};
const mongoose=require('mongoose');
const jwt =require('jsonwebtoken');
const bcrypt=require('bcrypt');

const schema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    
    mobile:{
        type:String,
    },
    isverified:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
        type:String,
        required:true
        }
    }],
    city:{
        type:String
    },
    college:{
        type:String
    },
    startyear:{
        type:String,
    },
    completeyear:{
        type:String,
    },
    course:{
        type:String,
    },
    branch:{
        type:String,
    },
    bio:{
        type:String
    },
    domains:{
        type:String
    },
    describe:{
        type:String
    },
    experience:{
        type:String
    },
    skills:{
        type:String
    },
    blinks:{
        type:Number,
        default:0
    },
    image:{
        data:Buffer,
        contentType:String
    }
})

// schema.pre("save",async function(next){
//     // 
//     if(this.isModified("password")){
//     this.password=  bcrypt.hash(this.password, Number(process.env.SALT))
//     this.Confirmpassword= bcrypt.hash(this.Confirmpassword, Number(process.env.SALT));
// }
    
//     next();
// })
schema.methods.generateauthToken=async function(){
    try {
        const token =jwt.sign({_id:this._id.toString()},process.env.JWTSECRETKEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        
        console.log('the error part'+error);
    }
}



const User= mongoose.model('User',schema)
module.exports={User};