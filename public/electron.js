const path = require('path');
const url = require('url');
const {app, screen, BrowserWindow} = require('electron')
const isDev = require("electron-is-dev");
const ipcMain = require('electron').ipcMain;
const {registryMainProcessEvents} = require('../platform/main/events-registry');

function createWindow() {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: __dirname + '/preload.js',
            webSecurity: false
        }
    })

    if (isDev) {
        win.loadURL("http://localhost:3000").then(r => {
        })
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, '../build/index.html'),
            protocol: 'file:',
            slashes: true
        })).then(r => {
        })
    }

    registryMainProcessEvents(ipcMain)

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

