const expressHandler = require("express-async-handler");
const Listing = require("./models/listing.js");

const postImage = expressHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(500).json({ error: "No file found" });
        }

        const { filename, path } = req.file;
        const { title, description,price,rating } = req.body; // Assuming title and description are sent in the request body

        const newListing = new Listing({
            filename,
            filepath: path,
            title, // Access title from req.body
            description, 
            price,// Access description from req.body
            rating,
        });

        const savedListing = await newListing.save();

        res.status(200).json(savedListing);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = { postImage };
