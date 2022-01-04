const express = require('express');
const complain = require('../model/complaint');
const router = express.Router();
const Complain=require('../model/complaint');
module.exports = router;

router.post('/complaint/signup', async (req, res) => {
    const complain = new Complain(req.body);
    // console.log(req.body);
    try {
        await complain.save();
        res.status(201).send(complain);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/complaint/getAllComplaints', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    try {
        const AllComplaints = await Complain.find();
        res.status(201).send(AllComplaints);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/complaint/getComplaint/:_id', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    try {
        console.log(req.params._id);
        const complaint = await Complain.findOne({ '_id': req.params._id});
        console.log(complaint);
        res.status(201).send(complaint);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.patch('/complaint/updateComplaint', async (req, res) => {
    try {
        let complaint = await Complain.findOne({ '_id': req.body._id });
        if(req.body.Status)
        {
            complaint.Status = req.body.Status;
        }
        
        if (req.body.AssignedTo)
        {
            complaint.AssignedTo = req.body.AssignedTo;
        }
        console.log(complaint);
        await complaint.save();
        res.status(200).send(complaint);
    }
    catch (err) {
        res.status(401).send(err);
    }

})

