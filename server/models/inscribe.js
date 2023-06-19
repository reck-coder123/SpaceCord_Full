const mongoose=require('mongoose');
const inscribeschema=mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    UserName:{
        type:String,
        required:true
    },
    UserImage:{
        data:Buffer,
        contentType:String
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        data:Buffer,
        contentType:String
    },
    comments:[{
        senderid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        senderName:{
            type: String,
        },
        comment:{
            type:String,
            trim:true
        }
    }],
    upcord:{
        type: Map,
      of: Boolean,
    },
    downcord:{
        type: Map,
      of: Boolean,
    }


})
const Inscribe=mongoose.model('Inscribe',inscribeschema);
module.exports={Inscribe};