// Inter Process Communication
var ipc = require('electron').ipcRenderer;

var registerButton = document.getElementById('register-button');

var registerEmail = document.getElementById('register-email');

var registerUsername = document.getElementById('register-username');

var registerPass = document.getElementById('register-pass');

registerButton.addEventListener('click', function(){
    var registerData = {
        email: registerEmail.value,
        username: registerUsername.value,
        pass: registerPass.value,
    }
    ipc.send('registerUser', registerData);
})