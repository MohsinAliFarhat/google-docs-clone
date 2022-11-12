const DocumentModel = require("@models/Document.model.js")
const CustomError = require('@config/CustomError');

exports.getAllDocuments = async (userId) => {

    let documents = await DocumentModel.find({ user: userId });
    return documents;

}

exports.createDocument = async (userId) => {

    let document = new DocumentModel({
        userId: userId,
        title: "Untitled Document",
        content: ""
    })
    await document.save();
    return document;

}

exports.getSingleDocument = async (documentId) => {

    let document = await DocumentModel.findOne({ _id: documentId });
    return document;

}

exports.updateDocument = async (documentId,title) => {

    let doc = await DocumentModel.findOneAndUpdate({_id:documentId}, {title:title});
    return doc;

}

