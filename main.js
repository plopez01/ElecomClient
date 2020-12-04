const { app, BrowserWindow } = require('electron')

const authModule = require("./modules/auth.js");

//Define ipc
var ipc = require('electron').ipcMain;

function createWindow () {
  const win = new BrowserWindow({
    width: 1024,
    height: 840,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.setMenuBarVisibility(false);

  win.loadFile('login/login.html')

  win.webContents.openDevTools()

  main();
}

function main(){
  console.log("App Loaded");
  //authModule.login();
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

ipc.on('login-user', function(event, data){
  authModule.login(data);
  event.reply("login-state", 'ok');
});

ipc.on('register-user', function(event, data){
  authModule.register(data);
});

