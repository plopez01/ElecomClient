const { app, ipcMain, BrowserWindow } = require('electron');

const authModule = require('./modules/auth.js');
const storageModule = require('./modules/storage');
const userModule = require('./modules/user');

var sessionData;

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 840,
    backgroundColor: '#414141',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  win.setMenuBarVisibility(false);

  storageModule.setupStorage('Elecom');

  sessionData = storageModule.getUserData('userData');

  if(sessionData != null){
    if(authModule.session(sessionData)){
      win.loadFile('app/app-main.html')
    }else{
      win.loadFile('login/login.html')
    }
  }else{
    win.loadFile('login/login.html')
  }

  win.webContents.openDevTools()

  main();
}

function main(){
  console.log('[Main/INFO] Elecom loaded');
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on('login-user', function(event, data){
  authModule.login(data).then(function(loginState){
    event.reply('login-state', loginState);
  });
});

ipcMain.on('register-user', function(event, data){
  authModule.register(data).then(function(registerState){
    event.reply('register-state', registerState);
  });
});

ipcMain.on('friend-request', function(event, data){
  userModule.sendFriendRequest(data).then(function(requestState){
    event.reply('request-state', requestState);
  });
});


