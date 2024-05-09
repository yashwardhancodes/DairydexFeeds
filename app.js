if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
    }

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const engine = require('ejs-mate');
const methodOverride=require("method-override");
const {upload}=require("./upload.js");
const { postImage } = require("./controller");
const ExpressError=require("./utils/expressError.js");
const router=require("./routes/index.js");
const session = require("express-session");
const cookieParser=require("cookie-parser");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const Admin=require("./routes/admin.js");
const UserRouter=require("./routes/user.js");
const flash = require('connect-flash');



app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,"public")));
app.use("/public",express.static('public'));
app.use(cookieParser());


const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true, 
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
};



const mongo_url='mongodb://127.0.0.1:27017/film';

main().then(()=>{
    console.log("connected to database");
}).catch((err)=>{
console.log("error");
});


async function main(){
    await mongoose.connect(mongo_url);
}




app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

 
app.get("/",(req,res)=>{
    res.render("../views/pages/home.ejs");
});

app.use("/listings",router);
app.use("/",UserRouter);
app.use("/",Admin);


app.get("/aboutus",(req,res)=>{
     res.render("../views/pages/aboutus.ejs");
});

// app.get("/business",(req,res)=>{
//     res.render("../views/pages/business.ejs");
// });





//route to upload images to database
app.post("/",upload.single("image"),postImage);
//app.use("/");

app.get("/upload",(req,res)=>{
    res.render("uploadImage.ejs");
});



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found!"));
})
//middleware to handle error
app.use((err,req,res,next)=>{
      let {statusCode=500,message="Something went wrong"}=err;
      res.status(statusCode).render("error.ejs",{err});
});

app.listen(8080,()=>{
    console.log("listening to the port");
});
