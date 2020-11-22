const {app, BrowserWindow} = require('electron')
const isDev = require("electron-is-dev");
const ipcMain = require('electron').ipcMain;
const {initMainControllers} = require(__dirname+'/platform/procs/main/init');

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    })

    if (isDev) {
        win.loadURL("http://localhost:3000").then(r => {
        })
    } else {
        win.loadFile('index.html').then(r => {
        })
    }

    initMainControllers(ipcMain)

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

