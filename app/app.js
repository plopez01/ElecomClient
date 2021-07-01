// Inter Process Communication
const { remote, ipcRenderer } = require('electron');

var inputUtils = require('../util/inputUtils');

var addFriendTag = document.getElementById('friend-box');

var addFriendButton = document.getElementById('add-button');

addFriendButton.addEventListener('click', friendRequest)

//Enter press email move to password input
addFriendTag.addEventListener("keyup", function(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      friendRequest();
    }
});

//IPC login-state async event
ipcRenderer.on('request-state', (event, status) => {
    if(status == true){
        //Handle correct login
        remote.getCurrentWindow().loadFile('./app/app-main.html');
    }else{
        showError(status)
    }
})

function friendRequest(){
    if(inputUtils.userTagCheck(addFriendTag.value)){
        ipcRenderer.send('friend-request', addFriendTag.value);
    }else{
        showError('Invalid user tag!');
    }
}

//Invalid input message handler
function showError(msg){
    //Handle invalid input
    console.warn(msg);
}