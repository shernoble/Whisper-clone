require("../models/database");
const User=require("../models/User");
// const session=require("express-session");
const passport=require("passport");
// const connectEnsureLogin = require('connect-ensure-login');
// passport-local will be used by passport-local-mongoose but we dont need to explicitly require it


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
    const user_login=new User({
        email:req.body.email,
        password:req.body.password
    });
    req.login(user_login,function(err){
        if(err) console.log(err);
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            }); 
        }
    });
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
    console.log(req.body.password);
    User.register({email:req.body.email},req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        else{
            // authenticate "local"ly
            // callback is triggered onlywhen auth is successful, cookies are created, sessions are cerated
            passport.authenticate("local")(req,res,function(){
                console.log(req.isAuthenticated());
                res.redirect("/secrets");
            }); 
        }
    });
    
}
exports.checkAuth=async(req,res)=>{
    // connectEnsureLogin.ensureLoggedIn();
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        console.log("auth");
        res.render("secrets");
    }
    else{
        console.log("no auth");
        res.redirect("/login");
    }
}
exports.logoutUser=async(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}