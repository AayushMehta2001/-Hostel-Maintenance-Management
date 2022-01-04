const express = require('express');
const { off } = require('../model/student');
const router = express.Router();
const Student = require('../model/student');

router.post('/student/signin', async (req, res) => {

    const student = new Student(req.body);
    try {
        const oldstudent = await Student.findOne({ 'email': req.body.email });
        //console.log(oldParkFinder)
        if (oldstudent !== null) {
            throw ('email already exist');
        }
        await student.save();
        res.status(201).send(student);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.post('/student/login', async (req, res) => {
    try {
        const obj = req.body;
        const student = await Student.findOne({ 'email': obj.email });
        if (!student) {
            throw ('email does not exit try again!!')
        }
        if (student.password !== obj.password) {
            throw ('password do not match try again!!');
        }
        const token = await student.getAuthToken();
        res.status(201).send({ student, token });
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.post('/student/logout', async (req, res) => {
    try {
        const obj = req.body;
        const student = await Student.findOne({ 'email': obj.email });
        student.token = null;
        await student.save();
        res.status(200).send(student);
    }
    catch (e) {
        res.status(401).send(e);
    }
});



module.exports = router;