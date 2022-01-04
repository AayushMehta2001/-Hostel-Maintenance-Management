console.log('ac');
document.getElementById('supervisorLogout').addEventListener('click', function () {
    localStorage.setItem('token',null);
    window.location.href="login.html";
})

fetch('http://localhost:3005/employee/getAllEmployees', {
    method: 'GET',
})
    .then(res =>
        res.json()).then(d => {
            console.log(d);
            let email = localStorage.getItem('email');
            let str = "";
            for (let i = 0; i < d.length; i++) {
                
                let c1 = `E${i+1}`;
                let c2 = d[i].name;
                let c3 = d[i].designation;
                let c4 = d[i].joiningDate;
                let c5 = d[i].taskAssigned;
                let c6 = d[i].contact;
                let c7 = d[i].email;
                str = str + `<tr>
                <th>${c1}</th>
                <th>${c2}</th>
                <th>${c3}</th>
                <th>${c4}</th>
                <th>${c5}</th>
                <th>${c6}</th>
                <th>${c7}</th>
                </tr>`
                
            }
            document.getElementById('allEmployees').innerHTML = str;
        })
    .catch((err) => {
        console.log(err);
    });

