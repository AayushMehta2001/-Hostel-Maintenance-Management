const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const supervisorSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    token:{
        type:String,
    },
});
supervisorSchema.methods.getAuthToken=async function()
{
    const supervisor=this;
    const token=jwt.sign({_id : supervisor._id.toString()},'thisisit');
    supervisor.token=token;
    await supervisor.save();
    return token;
}
const supervisor = mongoose.model('supervisor', supervisorSchema);
module.exports=supervisor;