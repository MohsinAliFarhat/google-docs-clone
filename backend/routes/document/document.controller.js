var express = require("express");
var router = express.Router();
const authJWT = require('@config/authJWT');

router.post('/create', (req, res) => {

});

router.get('/listAll', authJWT, (req, res) => {
    res.send(req.user._id)
})

router.post('/:id', (req, res) => {

});

router.get('/:id', (req, res) => {

})


module.exports = router;
