const express=require("express");
const expressLayouts=require("express-ejs-layouts");
const mongoose=require("mongoose");
const app=express();
const bodyParser=require("body-parser");
// const md5=require("md5");
const session=require("express-session");
const passport=require("passport");
// const passportLocalMongoose=require("passport-local-mongoose");
const LocalStrategy=require("passport-local").Strategy;
const User=require("./server/models/User");

app.set('view engine','ejs');

// middleware
app.use(express.static('public'));
app.use(session({
    secret: 'Our lil secret.',
    resave: false,
    saveUninitialized: true
    // cookie: { secure: true }
}));
app.use(expressLayouts);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();

// set up session with some initial config

// initialize passport
app.use(passport.initialize());
// tell app to use passport to set up session
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// setting up express-ejs-layouts
app.set('layout','./layouts/main');

const routes=require('./server/routes/userRoutes.js');
app.use("/",routes);



app.listen(3000,()=>{
    console.log("server started on port 3000");
});
