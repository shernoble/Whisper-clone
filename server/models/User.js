const mongoose=require("mongoose");


require('dotenv').config();
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:'This field is required'
    },
    password:{
        type:String,
        required:'This field is required'
    }
});

// model name =users of schema categorySchema
module.exports=mongoose.model('User',userSchema);