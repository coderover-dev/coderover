const {app, BrowserWindow} = require('electron')
const isDev = require("electron-is-dev");
const ipcMain = require('electron').ipcMain;
const {registerMainEventHandlers} = require(__dirname+'/platform/process/main');

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: __dirname + '/preload.js',
        }
    })

    if (isDev) {
        win.loadURL("http://localhost:3000").then(r => {
        })
    } else {
        win.loadFile('index.html').then(r => {
        })
    }

    registerMainEventHandlers(ipcMain)

    //open web tools to allow debugging
    win.webContents.openDevTools()
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

