console.log('ac');
document.getElementById('complaintLogout').addEventListener('click', function () {
    localStorage.setItem('token', null);
    window.location.href = "login.html";
})

fetch('http://localhost:3005/complaint/getAllComplaints')
    .then(res =>
        res.json()).then(d => {
            console.log(d[0]);
            let str = "";
            for(let i=0 ; i<d.length ; i++)
            {
                let c1=i+1;
                let c2=d[i].rollNumber;
                let c3=d[i].ctype;
                let c4=d[i].complaintDate;
                let c5=d[i].complaintDetails;
                let c6=d[i].location;
                let c8 = "allocated";
                let c7="E1";
                str = str+ `<tr>
                <td>${c1}</td>
                <td>${c2}</td>
                <td>${c3}</td>
                <td>${c4}</td>
                <td>${c5}</td>
                <td>${c6}</td>
                <td>${c7}</td>
                <td>${c8}</td>
                </tr>`
            }
            document.getElementById('allComplaints').innerHTML = str;
        })
    .catch((err) => {
        console.log(err);
    });