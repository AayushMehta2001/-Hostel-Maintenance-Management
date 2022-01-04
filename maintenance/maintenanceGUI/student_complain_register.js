console.log('ac');
var form = document.getElementById("complaintForm");
function handleForm(event) { event.preventDefault(); }
document.getElementById('studentLogout').addEventListener('click', function () {
    localStorage.setItem('token', null);
    localStorage.setItem('email',null);
    window.location.href = "login.html";
})
document.getElementById('submitComplaint').addEventListener('click',function () 
{
    let complaintDate = document.getElementById('autofillDate').value;
    let preferredDate = document.getElementById('studentPreferredDate').value;
    let Name = document.getElementById('Name').value;
    let rollNumber = document.getElementById('rollNumber').value;
    let hostelName = document.getElementById('hostel-dropdown').value;
    let locationSite = document.getElementById('site-dropdown').value;
    let specificSite = document.getElementById('specificSite').value;
    let email = document.getElementById('Email').value;
    let phoneNumber = document.getElementById('Phone').value;
    let complaintType = document.getElementById('type-dropdown').value;
    let complaintDetails = document.getElementById('complaintDetails').value;
    let hostel=hostelName + ' ' + locationSite + ' ' + specificSite;

    let data={
        'name' : Name,
        'email' : email,
        'phone' : phoneNumber,
        'rollNumber' : rollNumber,
        'ctype': complaintType,
        'hostel': hostelName,
        'location': hostel,
        'complaintDate':complaintDate,
        'preferredDate': preferredDate,
        'complaintDetails': complaintDetails,
        'AssignedTo' : 'E1',
        'Status' : "allocated",
        'isStudent' : true
    };
    console.log(data);

    fetch('http://localhost:3005/complaint/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res =>
            res.json()).then(d => {
               console.log(d);
               localStorage.setItem('_id',d._id);
            })
        .catch((err) => {
            console.log(err);
        });
    
    fetch('http://localhost:3005/employee/getAllEmployees', {
        method: 'GET',
        
    })
        .then(res =>
            res.json()).then(d => {
                console.log(d);
                d.sort((a,b)=>(a.taskInfo.length > b.taskInfo.length ? 1 : -1));
                let cntSameDesignation=0,cntSameDate=0;
                
                for(let i=0 ; i<d.length ; i++)
                {
                    let prevCnt=cntSameDate;
                    for (let j = 0; j < d[i].taskInfo.length; j++)
                     {
                        if (d[i].taskInfo[j].workingDate == data.preferredDate) {
                            cntSameDate++;
                        }
                    }
                    if (prevCnt == cntSameDate )
                    {
                        
                        fetch('http://localhost:3005/employee/updateEmployee', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                'email': d[i].email,
                                'workingDate': preferredDate,
                                'complaintId': localStorage.getItem('_id')
                            })
                        })
                            .then(res =>
                                res.json()).then(d => {
                                    console.log(d);
                                })
                            .catch((err) => {
                                console.log(err);
                            });
                            console.log(d[i].email);
                        fetch('http://localhost:3005/complaint/updateComplaint', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                'AssignedTo' : d[i].email,
                                '_id' : localStorage.getItem('_id')
                            })
                        })
                            .then(res =>
                                res.json()).then(d => {
                                    console.log(d);
                                })
                            .catch((err) => {
                                console.log(err);
                            });
                        return;
                    }
                }
                
                alert('try different preferred date');
                   
                
                
            })
        .catch((err) => {
            console.log(err);
        });
    

});

fetch('http://localhost:3005/complaint/getAllComplaints', {
    method: 'GET',
})
    .then(res =>
        res.json()).then(d => {
            console.log(d);
            let email=localStorage.getItem('email');
            let str = "";
            for (let i = 0; i < d.length; i++) {
                if(d[i].email==email)
                {
                    let c1 = i + 1;
                    let c2 = d[i].ctype;
                    let c3 = d[i].complaintDate;
                    let c4 = d[i].complaintDetails;
                    let c5 = d[i].location;
                    let c6 = d[i].Status;
                    str = str + `<div class="table-row">
                    <div class="table-data">${c1}</div>
                    <div class="table-data">${c2}</div>
                    <div class="table-data">${c3}</div>
                    <div class="table-data">${c4}</div>
                    <div class="table-data">${c5}</div>
                    <div class="table-data">${c6}</div>
                  </div>`
                }
            }
            document.getElementById('allStudentComplaints').innerHTML = str;
        })
    .catch((err) => {
        console.log(err);
    });
