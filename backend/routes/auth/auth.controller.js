var express = require("express");
var router = express.Router();
var authService = require("./auth.service");
const CustomError = require('@config/CustomError');

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        try {
            const user = await authService.signUp(name, email, password);
            res.status(200).send(user);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
    else res.status(400).send(new CustomError(400, 'Please enter all details'));

});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            const user = await authService.signIn(email, password);
            res.status(200).send(user);
        } catch (ex) {
            res.status(500).send(ex);
        }
    }
    else res.status(400).send(new CustomError(400, 'Please enter all details'));
});

module.exports = router;