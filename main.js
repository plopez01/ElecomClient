const { app, ipcMain, BrowserWindow } = require('electron');

const authModule = require('./modules/auth.js');
const storageModule = require('./modules/storage');

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

  win.webContents.openDevTools()

  main();
}

function main(){
  storageModule.setupStorage('Elecom');
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

