const express=require("express");
const expressLayouts=require("express-ejs-layouts");
const mongoose=require("mongoose");
const app=express();
const bodyParser=require("body-parser");
const md5=require("md5");


app.set('view engine','ejs');

// middleware
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();

// setting up express-ejs-layouts
app.set('layout','./layouts/main');

const routes=require('./server/routes/userRoutes.js');
app.use("/",routes);



app.listen(3000,()=>{
    console.log("server started on port 3000");
});
