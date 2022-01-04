const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const studentSchema = mongoose.Schema({
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
    token: {
        type: String,
    },
});
studentSchema.methods.getAuthToken = async function () {
    const student = this;
    const token = jwt.sign({ _id: student._id.toString() }, 'thisisit');
    student.token = token;
    await student.save();
    return token;
}
const student = mongoose.model('student', studentSchema);
module.exports = student;