const express = require('express');
const { off } = require('../model/employee');
const router = express.Router();
const Employee = require('../model/employee');

router.post('/employee/signin', async (req, res) => {

    const employee = new Employee(req.body);
    try {
        const oldemployee = await Employee.findOne({ 'email': req.body.email });
        //console.log(oldParkFinder)
        if (oldemployee !== null) {
            throw ('email already exist');
        }
        await employee.save();
        res.status(201).send(employee);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

router.post('/employee/login', async (req, res) => {
    try {
        const obj = req.body;
        const employee = await Employee.findOne({ 'email': obj.email });
        if (!employee) {
            throw ('email does not exit try again!!')
        }
        if (employee.password !== obj.password) {
            throw ('password do not match try again!!');
        }
        const token = await employee.getAuthToken();
        res.status(201).send({ employee, token });
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/employee/getAllEmployees',async(req,res)=>{
    try{
        let allEmployees=await Employee.find();
        res.status(201).send(allEmployees);
    }
    catch(err)
    {
        res.status(401).send(err);
    }
})

router.patch('/employee/updateEmployee', async(req,res)=>{
    try{
        let employee = await Employee.findOne({ 'email': req.body.email });
        // console.log(employee);
        employee.taskInfo.push({ 'workingDate': req.body.workingDate, 'complaintId': req.body.complaintId});
        employee.taskAssigned=employee.taskAssigned+1;
        await employee.save();
        res.status.send(employee);
    }
    catch(err)
    {
        res.status(401).send(err);
    }

})

router.post('/employee/logout', async (req, res) => {
    try {
        const obj = req.body;
        const employee = await Employee.findOne({ 'email': obj.email });
        employee.token = null;
        await employee.save();
        res.status(200).send(employee);
    }
    catch (e) {
        res.status(401).send(e);
    }
});



module.exports = router;