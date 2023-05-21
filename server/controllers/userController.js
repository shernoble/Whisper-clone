require("../models/database");
const User=require("../models/User");
// const md5=require("md5");
const bcrypt=require("bcrypt");
const saltRounds=10;

exports.homepage=async(req,res)=>{
    try{
        res.render("home");
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}
exports.login=async(req,res)=>{
    try{
        res.render("login");
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}
exports.loginPost=async(req,res)=>{
    try{
        const e=req.body.email;
        const pass=req.body.password;
        const user_log=await User.findOne({email:e});
        // decrypt pass
        if(user_log){
            bcrypt.compare(pass, user_log.password, function(err, result) {
                // result == true
                if(result == true) res.render("secrets");
                else console.log("incorrect password");
            });
            
        }
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}
exports.register=async(req,res)=>{
    try{
        res.render("register");
        
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}
exports.registerPost=async(req,res)=>{
    bcrypt.hash(req.body.password,saltRounds,function(err, hash){
        const newUser=new User({
            email:req.body.email,
            // hash password using md5 js hashfunction
            password:hash
        });
        // console.log(newUser);
        newUser.save()
        // encrypt pass
        .then(function(){
            console.log("successss");
            res.render("secrets");
        })
        .catch(function(err){
            console.log(err);
        })
    });
    
}