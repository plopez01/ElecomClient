const { app, ipcMain, BrowserWindow } = require('electron');

let sessionData;

const authModule = require('./modules/auth.js');
const storageModule = require('./modules/storage');
const userModule = require('./modules/user');

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

  win.loadFile('app/app-main.html')

  storageModule.setupStorage('Elecom');

  console.log('[Main/INFO] Loading userData...');
  storageModule.getUserData('userData').then(function(data){
    sessionData = data;
    if(sessionData){
      authModule.session(sessionData).then(function(status){
        if(status == true){
          console.log('[Main/INFO] Logged in with session!');
          win.loadFile('app/app-main.html')
        }else{
          win.loadFile('login/login.html')
        }
      })
    }else{
      win.loadFile('login/login.html')
    }
  });
  
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
  data.sessionToken = sessionData.sessionToken; // Add session auth token to data object before forwarding
  userModule.sendFriendRequest(data).then(function(requestState){
    event.reply('request-state', requestState);
  });
});


