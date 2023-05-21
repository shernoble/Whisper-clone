const express=require("express");
const router=express.Router();

const userController=require('../controllers/userController');

router.get("/",userController.homepage);
router.get("/login",userController.login);
router.post("/login",userController.loginPost);
router.get("/register",userController.register);
router.post("/register",userController.registerPost);
// router.get("/auth",userController.auth);

module.exports=router;