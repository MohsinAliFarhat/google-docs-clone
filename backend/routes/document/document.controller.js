var express = require("express");
var router = express.Router();
const authJWT = require('@config/authJWT');
const documentService = require('./document.service');

router.post('/create', (req, res) => {

});

router.get('/listAll', authJWT, async (req, res) => {
    try {
        const documents = await documentService.getAllDocuments(req.user._id);
        res.status(200).send({documents:documents});
    } catch (ex) {
        res.status(ex.status).send(ex);
    }

})

router.post('/:id', (req, res) => {

});

router.get('/:id', (req, res) => {

})


module.exports = router;
