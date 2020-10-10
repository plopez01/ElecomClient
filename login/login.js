// Inter Process Communication
var ipc = require('electron').ipcRenderer;

var loginButton = document.getElementById('login-button');

var loginName = document.getElementById('login-name');

var loginPass = document.getElementById('login-pass');


loginButton.addEventListener('click', function(){
    var loginData = {
        name: loginName.value,
        pass: loginPass.value,
    }
    ipc.send('loginUser', loginData);
})