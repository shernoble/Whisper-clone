const mongoose=require("mongoose");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");

require('dotenv').config();
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:'This field is required'
    }
    // password:{
    //     type:String,
    //     required:'This field is required'
    // }
});
// PASSPORT
// hash n salt our passwords and save users into mongodb
userSchema.plugin(passportLocalMongoose,{usernameField:'email'});

// model name =users of schema categorySchema
module.exports=mongoose.model('User',userSchema);
