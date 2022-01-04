const express = require('express');
const { off } = require('../model/caretaker');
const router = express.Router();
const Caretaker = require('../model/caretaker');

router.post('/caretaker/signin', async (req, res) => {

    const caretaker = new Caretaker(req.body);
    try {
        const oldcaretaker = await Caretaker.findOne({ 'email': req.body.email });
        //console.log(oldParkFinder)
        if (oldcaretaker !== null) {
            throw ('email already exist');
        }
        await caretaker.save();
        res.status(201).send(caretaker);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.post('/caretaker/login', async (req, res) => {
    try {
        const obj = req.body;
        const caretaker = await Caretaker.findOne({ 'email': obj.email });
        if (!caretaker) {
            throw ('email does not exit try again!!')
        }
        if (caretaker.password !== obj.password) {
            throw ('password do not match try again!!');
        }
        const token = await caretaker.getAuthToken();
        res.status(201).send({ caretaker, token });
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.post('/caretaker/logout', async (req, res) => {
    try {
        const obj = req.body;
        const caretaker = await Caretaker.findOne({ 'email': obj.email });
        caretaker.token = null;
        await caretaker.save();
        res.status(200).send(caretaker);
    }
    catch (e) {
        res.status(401).send(e);
    }
});



module.exports = router;