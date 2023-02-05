const express = require("express");
const router = new express.Router();
const User = require('../model/User');
const auth = require('../middleware/auth');

router.post('/user/login', async (req, res) => {
    try {
        console.log('req is arrived.');
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }
    catch (e) {
        res.status(400).send();
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.token = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })

        await req.user.save();
    }
    catch (e) {
        res.status(500).send();
    }
})

router.post('/user/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
})

