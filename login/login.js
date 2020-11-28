// Inter Process Communication
var ipc = require('electron').ipcRenderer;

var inputUtils = require('../util/inputUtils');

var loginButton = document.getElementById('login-button');

var loginEmail = document.getElementById('login-email');

var loginPass = document.getElementById('login-pass');

loginButton.addEventListener('click', function(){
    var loginData = {
        email: loginEmail.value,
        pass: loginPass.value,
    }
    if(inputUtils.emailCheck(loginData.email) && inputUtils.passCheck(loginData.pass)){
        ipc.send('loginUser', loginData);
    }else{
        //Handle invalid input
        console.error("Invalid input!");
    }
})