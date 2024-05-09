const express=require("express");
const router=express.Router();
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({storage});

const listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/expressError.js");


const isAdmin = (req, res, next) => {
    // Check if user is authenticated and has admin privileges
    if (req.user && req.user.isAdmin) {
        // User is admin, proceed to the next middleware or route handler
        return next();
    } else {
        // User is not admin, respond with an error
        return res.status(403).send("Forbidden: Only admins can access this resource.");
    }
};





//index route
router.get("/",async (req,res)=>{
    const allListings=await listing.find({});
    res.render("../views/pages/index.ejs",{allListings});
    
   });

//new route
router.get("/new",isAdmin,(req,res)=>{
    res.render("../views/pages/new.ejs");
  });


//show route

router.get("/:id",async (req,res)=>{
    let {id}=req.params;
    const User=req.user;
    const Listing=await listing.findById(id);
    res.render("../views/pages/show.ejs",{Listing,User});
});

//create Route
router.post("/",upload.single("listing[image]"),isAdmin,wrapAsync (async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);
   
   const newListing=new listing(req.body.listing);     
   newListing.image={url,filename} ;
   await newListing.save();
   if(!req.body.listing){
    throw new ExpressError(400,"Send valid data for listing");
 }
   res.redirect('/listings')

}));

//edit route
router.get("/:id/edit",isAdmin,async (req,res)=>{
    let {id}=req.params;
    const Listing=await listing.findById(id);
    res.render("pages/edit.ejs",{Listing});
});



//update route
router.put("/:id",isAdmin,upload.single('listing[image]'),wrapAsync(async(req,res,next)=>{
    if(!req.body.listing){
       throw new ExpressError(400,"Send valid data for listing");
    }
    const 
    {id}=req.params;
      
       if(typeof req.file !=="undefined"){
        let product = await listing.findByIdAndUpdate(id,{...req.body.listing});
        let url=req.file.path;
         let filename=req.file.filename;
         product.image={url,filename};
         await product.save();
        }
       res.redirect("/listings")
    
}));

//delete route
router.delete("/:id",isAdmin,async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
});

module.exports=router;