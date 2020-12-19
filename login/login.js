// Inter Process Communication
const { remote, ipcRenderer } = require('electron');

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


//IPC login-state async event
ipcRenderer.on('login-state', (event, state) => {
    if(state == true){
        remote.getCurrentWindow().loadFile('./app/app-main.html');
    }else{
        invalidInput(state);
    }
})

//Tries to login with data verification
function login(){
    var loginData = {
        email: loginEmail.value,
        pass: loginPass.value,
    }
    if(inputUtils.emailCheck(loginData.email) && inputUtils.passCheck(loginData.pass)){
        ipcRenderer.send('login-user', loginData);
    }else{
        invalidInput('Invalid email or password!');
    }
}

//Invalid input message handler
function invalidInput(msg){
    //Handle invalid input
    console.warn(msg);
    errorGroup.innerHTML = `<b>${msg}</b>`;
    errorGroup.style.animation = 'showError 1s forwards';
}