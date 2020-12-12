// Inter Process Communication
var ipc = require('electron').ipcRenderer;

var inputUtils = require('../util/inputUtils');

var loginButton = document.getElementById('login-button');

var loginEmail = document.getElementById('login-email');

var loginPass = document.getElementById('login-pass');

var errorGroup = document.getElementById('error-msg');

loginButton.addEventListener('click', login)

//Enter press email move to password input
loginEmail.addEventListener("keyup", function(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      loginPass.focus();
    }
});

//Enter press login support
loginPass.addEventListener("keyup", function(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      login();
    }
});

//Tries to login with data verification
function login(){
    var loginData = {
        email: loginEmail.value,
        pass: loginPass.value,
    }
    if(inputUtils.emailCheck(loginData.email) && inputUtils.passCheck(loginData.pass)){
        ipc.send('login-user', loginData);
    }else{
        //Handle invalid input
        console.warn("Invalid input!");
        errorGroup.innerText = 'Invalid email or password';
        errorGroup.style.animation = 'showError 1s forwards';
    }
}

//IPC login-state async event
ipc.on('login-state', (event, state) => {
    //Error client handling
    console.error(state);
    errorGroup.innerHTML = `<b>${state}</b>`;
    errorGroup.style.animation = 'showError 1s forwards';
})