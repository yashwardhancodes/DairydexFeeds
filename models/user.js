const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email:{
        type:String,
        required:true,
    },
    isAdmin: {
        type: Boolean,
        default: false // By default, users are not admins
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);