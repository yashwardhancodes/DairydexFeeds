const express=require("express");
const app=express();
const path=require("path");
app.use(express.static(path.join(__dirname,"public")));

const sampleListings = [
    {
      title: "Go-Dhatri Gold",
      description:
        "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
      image:{
        url:"https://i.postimg.cc/BnDPNWTT/bag1.png", 
        filename:"dairydex feeds product",
      },      
      price: 3000,
      rating:5,
      
    },
    {
      title: "Go-dhatri Prime",
      description:
        "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
      image: {
        url: "https://i.postimg.cc/DzV4mHWB/bag3.png",
        filename:"dairydex feeds product"
      },
      rating:5,
      price: 3000,
 
    },
    {
      title: "Go-Dhatri Mineral Mixture",
      description:
        "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
       image:{
        url:"https://i.postimg.cc/QCLWKznX/bottle.png",
        filename:"dairydex feeds product",
       } ,
      price: 2200,
      rating:5,
     
    },
  ]

  module.exports = { data : sampleListings };