const express=require("express");
const Router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport= require("passport");



Router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
})

Router.post("/signup",wrapAsync(async(req,res)=>{
    try{
    let {username,email,password}=req.body;
    let newUser=new User({username,email});

    let registeredUser=await User.register(newUser,password);
    console.log(registeredUser);

   
    req.login(registeredUser,function(err){
     if(err){
         return next(err);
     }
     req.flash("success","user was registered successfully. welcome to Dairydex");
     res.redirect("/listings");
    })


    }
    catch(e){
   
      console.log(e);
        res.redirect("/signup");
       }

}));

Router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});



Router.post("/login",passport.authenticate( "local",{failureRedirect:"/login",failureFlash:true}  ), async(req,res)=>{
    req.flash("login successfull");
    res.redirect("/listings");
});

Router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
})

module.exports=Router;