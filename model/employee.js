const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    designation:{
        type: String,
    },
    joiningDate:{
        type: String,
    },
    taskAssigned:{
        type: Number,
    },
    taskInfo:[{
        workingDate:{
            type: String,
        },
        complaintId:{
            type: String,
        }
    }
    ],
    contact:{
        type: String,
    },
    token: {
        type: String,
    },
});
employeeSchema.methods.getAuthToken = async function () {
    const employee = this;
    const token = jwt.sign({ _id: employee._id.toString() }, 'thisisit');
    employee.token = token;
    await employee.save();
    return token;
}
const employee = mongoose.model('employee', employeeSchema);
module.exports = employee;