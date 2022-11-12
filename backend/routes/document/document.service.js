const DocumentModel = require("@models/Document.model.js")
const CustomError = require('@config/CustomError');

exports.getAllDocuments = async (userId) => {

    let documents = await DocumentModel.find({ user: userId });
    return documents;

}

