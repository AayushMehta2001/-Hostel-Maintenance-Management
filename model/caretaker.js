const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const caretakerSchema = mongoose.Schema({
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
    token:{
        type: String,
    },
});
caretakerSchema.methods.getAuthToken=async function()
{
    const caretaker=this;
    const token=jwt.sign({_id : caretaker._id.toString()},'thisisit');
    caretaker.token=token;
    await caretaker.save();
    return token;
}

const caretaker = mongoose.model('caretaker', caretakerSchema);
module.exports = caretaker;