require("../models/database");
const User=require("../models/User");
// const session=require("express-session");
const passport=require("passport");
// const connectEnsureLogin = require('connect-ensure-login');
// passport-local will be used by passport-local-mongoose but we dont need to explicitly require it

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    
    const user=new User({
        email:req.body.email,
        password:req.body.password
    });

    req.login(user,function(err){
        if(err){
            console.log("error:"+err);
            res.render("login");
        }
        else{
            // authenticate
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secrets");
            });
        }
    })

}
exports.register=async(req,res)=>{
    try{
        res.render("register");
        
    }
    catch(err){
        res.status(500).send({message:err.message || "Error Occured"});
    }
}

exports.secrets=async(req,res)=>{
    if(req.isAuthenticated()){
        res.render("secrets");
    }
    else{
        res.redirect("/login");
    }
}

exports.registerPost=async(req,res)=>{
    
    console.log(req.body.email);
    User.register({email:req.body.email},req.body.password,function(err,user){
        if(err){
            console.log("error"+err);
            res.redirect("/register");
        }
        else{
            // type of auth performed->"local"
            
            passport.authenticate("local")(req,res,function(){
                // callback triggered only if authentication was successful
                res.redirect("/secrets");
            })
        }
    })

}

exports.logoutUser=async(req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}