// Inter Process Communication
var ipc = require('electron').ipcRenderer;

var loginButton = document.getElementById('login-button');

var loginEmail = document.getElementById('login-email');

var loginPass = document.getElementById('login-pass');

loginButton.addEventListener('click', function(){
    var loginData = {
        email: loginEmail.value,
        pass: loginPass.value,
    }
    ipc.send('loginUser', loginData);
})