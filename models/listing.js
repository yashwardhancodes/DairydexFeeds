const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title:{
    type:String,
    required:true,


  },
 description:{
    type:String,
    required:true,

  },
  price:Number,
  rating:Number,
 
   image: {
    url:String,
    filename:String,
  },
    
  rating:{
    type:Number,
  }


  });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;