const express = require('express');
const { off } = require('../model/supervisor');
const router = express.Router();
const Supervisor = require('../model/supervisor');

router.post('/supervisor/signin',async (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    const supervisor=new Supervisor(req.body);
    try{
        const oldsupervisor = await Supervisor.findOne({ 'email': req.body.email });
        //console.log(oldParkFinder)
        if (oldsupervisor!==null) {
            throw ('email already exist');
        }
        await supervisor.save();
        res.status(201).send(supervisor);
    }
    catch(e)
    {
        res.status(400).send(e);
    }
});

router.post('/supervisor/login', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');

    try {
        const obj=req.body;
        const supervisor=await Supervisor.findOne({'email':obj.email});
        if(!supervisor)
        {
            throw('email does not exit try again!!')
        }
        if(supervisor.password!==obj.password)
        {
            throw('password do not match try again!!');
        }
        const token=await supervisor.getAuthToken();
        res.status(201).send({supervisor,token});
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.post('/supervisor/logout',async(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5501');
    try
    {
        const obj = req.body;
        const supervisor = await Supervisor.findOne({ 'email': obj.email });
        supervisor.token=null;
        await supervisor.save();
        res.status(200).send(supervisor);
    }
    catch(e)
    {
        res.status(401).send(e);
    }
});



module.exports = router;