const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//************ */Create Schema***********//
const GoogleSchema = new Schema({
    googleId : String, 
    name : String,
    email: String,
    avatar : String
})

module.exports = GoogleUser = mongoose.model('googleusers', GoogleSchema)