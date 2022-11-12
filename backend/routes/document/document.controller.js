var express = require("express");
var router = express.Router();
const authJWT = require('@config/authJWT');
const documentService = require('./document.service');
const CustomError = require("../../config/CustomError");

router.post('/create', authJWT, async (req, res) => {

    try {
        const document = await documentService.createDocument(req.user._id);
        res.status(200).send(document);
    } catch (ex) {
        res.status(500).send(ex);
    }

});

router.get('/listAll', authJWT, async (req, res) => {
    try {
        const documents = await documentService.getAllDocuments(req.user._id);
        res.status(200).send({ documents: documents });
    } catch (ex) {
        res.status(500).send(new CustomError(500, 'Error while Fetching all document of a user'));
    }

})

router.put('/:id', authJWT, async (req, res) => {
    const { title } = req.body;

    if (!title) res.status(400).send(new CustomError(400, 'Please include all details.'))

    try {
        const documentUpdated = await documentService.updateDocument(req.params.id, title);
        res.status(200).send(documentUpdated);
    } catch (ex) {
        res.status(500).send(new CustomError(500, 'Error while updating the document'));
    }
});

router.get('/:id', authJWT, async (req, res) => {
    try {
        const document = await documentService.getSingleDocument(req.params.id);
        res.status(200).send(document);
    } catch (ex) {
        res.status(500).send(new CustomError(500, 'Error while Fetching Document'));
    }
})


module.exports = router;
