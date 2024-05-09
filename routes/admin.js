const express=require("express");
const Router=express.Router();
const User=require("../models/user.js");

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.isAdmin) {
        return next();
    } else {
        return res.status(403).send("Forbidden: Only admins can access this resource.");
    }
};

Router.get("/admin",isAdmin,(req,res)=>{
    res.render("users/admin.ejs");
});

module.exports=Router;