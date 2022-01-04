var form = document.getElementById("loginForm");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);
let loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click',function(){
    console.log('clicked login!!');
    if (document.getElementById('radio1').checked) 
    {
        console.log('yo1');
        let email=document.getElementById('email').value;
        let password = document.getElementById('password').value;
        
        const data={
            'email' : email,
            'password' : password
        }
        console.log(email + " " + password);
        fetch('http://localhost:3005/supervisor/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res =>
                res.json()).then(d => {
                    let token=d.token;
                    localStorage.setItem('token',token);
                    window.location.href="EmployeeList.html";
                })
            .catch((err) => {
                console.log(err);
            });
    }
    if (document.getElementById('radio2').checked) 
    {
        console.log('yo2');
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        const data = {
            'email': email,
            'password': password
        }
        console.log(email + " " + password);
        fetch('http://localhost:3005/employee/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res =>
                res.json()).then(d => {
                    let token = d.token;
                    console.log(d);
                    localStorage.setItem('token', token);
                    localStorage.setItem('taskInfo', JSON.stringify(d.employee.taskInfo));
                    window.location.href = "EmployeeTasksList.html";
                })
            .catch((err) => {
                console.log(err);
            });
    }
    if (document.getElementById('radio3').checked) {
        console.log('yo3');
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        const data = {
            'email': email,
            'password': password
        }
        console.log(email + " " + password);
        fetch('http://localhost:3005/caretaker/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res =>
                res.json()).then(d => {
                    let token = d.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('email',d.caretaker.email);
                    window.location.href = "caretaker_complain_register.html";
                })
            .catch((err) => {
                console.log(err);
            });
    }
    if (document.getElementById('radio4').checked) {
        console.log('yo4');
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        const data = {
            'email': email,
            'password': password
        }
        console.log(email + " " + password);
        fetch('http://localhost:3005/student/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res =>
                res.json()).then(d => {
                    let token = d.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('email',d.student.email);
                    console.log(d);
                    window.location.href = "student_complain_register.html";
                })
            .catch((err) => {
                console.log(err);
            });
    }
});



