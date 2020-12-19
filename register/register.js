// Inter Process Communication
const { remote, ipcRenderer } = require('electron');
const { registerUser } = require('../../ElecomWebServer/controllers/auth');

var inputUtils = require('../util/inputUtils');

var registerButton = document.getElementById('register-button');

var registerEmail = document.getElementById('register-email');

var registerUsername = document.getElementById('register-username');

var registerPass = document.getElementById('register-pass');

var errorGroup = document.getElementById('error-msg');

registerButton.addEventListener('click', register)

//Enter press email move to username input
registerEmail.addEventListener("keyup", function(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      registerUsername.focus();
    }
});

//Enter press email move to password input
registerUsername.addEventListener("keyup", function(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      registerPass.focus();
    }
});

//Enter press register support
registerPass.addEventListener("keyup", function(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      register();
    }
});


//IPC register-state async event
ipcRenderer.on('register-state', (event, state) => {
    if(state == true){
        //Handle registration
    }else{
        invalidInput(state);
    }
})

function register(){
    var registerData = {
        email: registerEmail.value,
        username: registerUsername.value,
        pass: registerPass.value,
    }
    if(inputUtils.emailCheck(registerData.email)){
        if(inputUtils.passCheck(registerData.pass)){
            if(inputUtils.userCheck(registerData.username)){
                ipcRenderer.send('register-user', registerData);
            }else{
                invalidInput('Invalid username!');
            }
        }else{
            invalidInput('Invalid password!');
        }
    }else{
        invalidInput('Invalid email!');
    }
}

//Invalid input message handler
function invalidInput(msg){
    //Handle invalid input
    console.warn(msg);
    errorGroup.innerHTML = `<b>${msg}</b>`;
    errorGroup.style.animation = 'showError 1s forwards';
}