require('./db/db');
const caretaker=require('./router/caretaker');
const supervisor=require('./router/supervisor');
const student=require('./router/student');
const employee=require('./router/employee');
const complain=require('./router/complain');
const cors = require('cors')
const express=require('express');
const app=express();

const port=3005; 

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use(supervisor);
app.use(caretaker);
app.use(student);
app.use(employee);
app.use(complain);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501")
    res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, PATCH, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next()
});

app.listen(port,()=>{
    console.log('server is runnign on port no. ',port);
});
