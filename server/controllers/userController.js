require("../models/database");
const User=require("../models/User");
const md5=require("md5");

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
        const pass=md5(req.body.password);
        const user_log=await User.findOne({email:e});
        // decrypt pass
        if(user_log){
            if(user_log.password==pass){
                res.render("secrets");
                
            }
            else console.log("incorrect password");
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
    try{
        const newUser=new User({
            email:req.body.email,
            // hash password using md5 js hashfunction
            password:md5(req.body.password)
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
        
        
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}