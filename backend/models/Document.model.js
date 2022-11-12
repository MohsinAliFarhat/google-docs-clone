const mongoose = require('mongoose');
const documentSchema = mongoose.Schema({
    title:String,
    content:mongoose.Schema.Types.Mixed,
    userId:String
},{ timestamps: true });

module.exports = mongoose.model("document",documentSchema);