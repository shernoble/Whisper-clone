const mongoose=require("mongoose");
const encrypt=require("mongoose-encryption");
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
// secrert: key used to encrypt password
// will encrypt entire db
userSchema.plugin(encrypt,{ secret: process.env.SECRET_KEY,encryptedFields:['password'] });
// model name =users of schema categorySchema
module.exports=mongoose.model('User',userSchema);