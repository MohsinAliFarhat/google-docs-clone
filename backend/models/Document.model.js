const mongoose = require('mongoose');
const documentSchema = mongoose.Schema({
    title:String,
    content:String,
    createdAt:Number,
    userId:String
},{ timestamps: true });

module.exports = mongoose.model("document",documentSchema);