// Inter Process Communication
var ipc = require('electron').ipcRenderer;

var inputUtils = require('../util/inputUtils');

var loginButton = document.getElementById('login-button');

var loginEmail = document.getElementById('login-email');

var loginPass = document.getElementById('login-pass');

var errorGroup = document.getElementById('error-msg');

loginButton.addEventListener('click', function(){
    var loginData = {
        email: loginEmail.value,
        pass: loginPass.value,
    }
    if(inputUtils.emailCheck(loginData.email) && inputUtils.passCheck(loginData.pass)){
        ipc.send('login-user', loginData);
    }else{
        //Handle invalid input
        console.error("Invalid input!");
        errorGroup.innerText = 'Invalid email or password';
        errorGroup.style.animation = 'showError 1s forwards';
    }
})

ipc.on('login-state', (event, state) => {
    console.log(state);
})