function register() {
    if (document.getElementById('name').value.length < 3) {
        showErrorPopup('Invalid Company Name');
    }
    else if (!document.getElementById('email').value.includes('@') && !document.getElementById('email').value.includes('.')) {
        showErrorPopup('Invalid Company Email');
    }
    else if (document.getElementById('password').value.length < 8) {
        showErrorPopup('Password is Short');
    }
    else {
        var data = {
            'company-name': `${document.getElementById('name').value}`,
            'company-email': `${document.getElementById('email').value}`,
            'company-password': `${document.getElementById('password').value}`,
        }
        fetch('https://recruitease-1cb2c-default-rtdb.firebaseio.com/registeredcompany.json', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application.json',
            }
        }).then((res) => {
            return res.json();
        }).then((d) => {
            console.log(d);
            localStorage.setItem('recruit-ease-logged', 1);
            localStorage.setItem('recruit-ease-name', data["company-name"]);
            location.replace('index.html');
        }).catch((err) => {
            console.log(err);
            showErrorPopup('Some Error Occured');
        })
    }
}
function homeload() {
    if (localStorage.getItem('recruit-ease-logged') == 1) {
        document.getElementById('logged-bar').innerHTML = `<a class="cansearch" href="candidatesearch.html"
        >Candidate Search<img src="images/search.svg" alt="" width="20px"
      /></a>
    <a href='' class="cansearch">${localStorage.getItem('recruit-ease-name')}</a>
    <a class="logout-button" href="index.html" onClick="logout()">Logout</a>
      `;
    }
    else {
        document.getElementById('logged-bar').innerHTML = `<a class="cansearch" href="candidatesearch.html"
        >Candidate Search<img src="images/search.svg" alt="" width="20px"
      /></a>
      <a class="login-button" href="login.html">Login</a>
      <a class="register-button" href="register.html">Register</a>
      `;
    }
}
function logout() {
    localStorage.clear();
}
function showErrorPopup(err) {
    var errorPopup = document.getElementById("errorPopup");
    errorPopup.classList.add("show");
    errorPopup.style.left = "20px";
    document.getElementById("errmsg").innerHTML = err;

    setTimeout(function () {
        closeErrorPopup();
    }, 2000);
}
function closeErrorPopup() {
    var errorPopup = document.getElementById("errorPopup");
    errorPopup.classList.remove("show");
    errorPopup.style.left = "-300px";
}
var maindata;
function logindata() {
    fetch('https://recruitease-1cb2c-default-rtdb.firebaseio.com/registeredcompany.json').then((res) => {
        return res.json();
    }).then((data) => {
        maindata = data;
    }).catch((err) => {
        console.log(err);
    })
}
function loginto() {
    var id = document.getElementById('login-email').value;
    var pass = document.getElementById('login-password').value;
    let flag = false;
    if (maindata != null) {
        Object.entries(maindata).forEach(([key, value]) => {
            if (value["company-email"] === id && value["company-password"] === pass) {
                localStorage.setItem('recruit-ease-logged', 1);
                localStorage.setItem('recruit-ease-name', value["company-name"]);
                location.replace('index.html');

                document.getElementById('logged-bar').innerHTML = `<a class="cansearch" href="candidatesearch.html"
            >Candidate Search<img src="images/search.svg" alt="" width="20px"
          /></a>
        <a href='' class="cansearch">${localStorage.getItem('recruit-ease-name')}</a>
        <a class="logout-button" href="index.html" onClick="logout()">Logout</a>
          `;
                flag = true;
            }
        });
    }
    else {
        showErrorPopup('Invalid Credentials');
    }
    if (!flag) {
        showErrorPopup('Invalid Credentials');
    }
}

function logincheck() {
    if (localStorage.getItem('recruit-ease-logged') == 1) {
        location.replace('candidatesearch.html');
    }
    else {
        location.replace('login.html');
    }
}