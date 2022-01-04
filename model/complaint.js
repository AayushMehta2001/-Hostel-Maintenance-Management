const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const complainSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    rollNumber:{
        type: String,
        require: true,
    },
    ctype: {
        type: String,
    },
    hostel: {
        type: String,
    },
    location: {
        type: String,
    },
    complaintDate: {
        type: String,
    },
    preferredDate: {
        type: String,
    },
    complaintDetails: {
        type:String,
    },
    AssignedTo: {
        type:String,
    },
    Status:{
        type:String,
    },
    isStudent:{
        type: Boolean
    }
});


const complain = mongoose.model('complain', complainSchema);
module.exports = complain;