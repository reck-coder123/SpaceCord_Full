const mongoose=require('mongoose');
const jwt =require('jsonwebtoken');


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
        type: Map,
      of: Boolean,
    },
    image:{
        data:Buffer,
        contentType:String
    }
})

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