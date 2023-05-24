const express=require("express");
const router=express.Router();
// const session=require("express-session");
const userController=require('../controllers/userController');

// const passport = require('passport');

router.get("/",userController.homepage);
router.get("/login",userController.login);
router.post("/login",userController.loginPost);
router.get("/register",userController.register);
router.post("/register",userController.registerPost);
router.get("/secrets",userController.checkAuth);
router.get("/logout",userController.logoutUser);
// router.get("/auth",userController.auth);

module.exports=router;