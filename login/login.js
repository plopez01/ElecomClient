// Inter Process Communication
var ipc = require('electron').ipcRenderer;

var loginButton = document.getElementById('login-button');

var loginName = document.getElementById('login-name');

var loginPass = document.getElementById('login-pass');

const loginData = {
    name: loginName.innerHTML,
    pass: loginPass.innerHTML,
}

loginButton.addEventListener('click', function(){
    ipc.send('loginUser', loginData) 
})