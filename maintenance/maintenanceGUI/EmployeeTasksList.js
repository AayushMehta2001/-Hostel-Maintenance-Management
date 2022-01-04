console.log('ac');
document.getElementById('employeeLogout').addEventListener('click', function () {
    localStorage.setItem('token', null);
    window.location.href = "login.html";
})
let taskInfo=JSON.parse(localStorage.getItem('taskInfo'));
let str='';
let complaintEmail=[];
for(let i=0 ; i<taskInfo.length ; i++)
{
    fetch('http://localhost:3005/complaint/getComplaint' + '/' + taskInfo[i].complaintId, {
        method: 'GET',
    })
        .then(res =>
            res.json()).then(d => {
                console.log(d);
                complaintEmail.push(d._id);
                let c1=d._id;
                let c2=d.rollNumber;
                let c3=d.ctype;
                let c4=d.complaintDate;
                let c5=d.complaintDetails;
                let c6=d.location;
                str= str + `<tr>
                    <td>${c1}</td>
                    <td>${c2}</td>
                    <td>${c3}</td>
                    <td>${c4}</td>
                    <td>${c5}</td>
                    <td>${c6}</td>
                    <td>
                        <select name="status" id="complaintStatus${i+1}">
                            <option value="alloted" ${d.Status=='alloted' ? 'selected' : ''}>alloted</option>
                            <option value="in-process" ${d.Status === 'in-process' ? 'selected' : ''}>in-process</option>
                            <option value="completed" ${d.Status == 'completed' ? 'selected' : ''}>completed</option>
                        </select>
                    </td>
                </tr>`
                document.getElementById('employeeTaskList').innerHTML = str;
            })
        .catch((err) => {
            console.log(err);
        });
}

document.addEventListener('change', function (e) {
    for(let i=0 ; i<=100 ; i++)
    {
        if (e.target && e.target.id == 'complaintStatus'+ i) {
            console.log(i + " " + complaintEmail[i-1])
            let Status=document.getElementById(e.target.id).value;
            console.log(Status);
            fetch('http://localhost:3005/complaint/updateComplaint', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'Status' : Status,'_id' : complaintEmail[i-1]})
            })
                .then(res =>
                    res.json()).then(d => {
                        console.log(d);
                    })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    
});

let caption = document.getElementById("captionId");
caption.innerHTML = "Maintenence Department";

