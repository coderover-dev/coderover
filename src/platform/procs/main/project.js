const electron = require('electron');

class ProjectEventMainProcController {
    constructor(ipcMain) {
        this.ipcMain = ipcMain;
    }

    initEvents() {
        const openProjectHandler = this.handleOpenProjectEvent.bind(this);
        this.ipcMain.on('open-project', openProjectHandler);
    }

    handleOpenProjectEvent(event, arg) {
        console.log("received req to open project")

        electron.dialog.showOpenDialog(this.ipcMain, {
            properties: ['openDirectory']
        }).then(result => {
            console.log(result.canceled)
            console.log(result.filePaths)
        }).catch(err => {
            console.log(err)
        })

        let projectPath = '';
        event.reply('project-opened', projectPath)
    }
}

module.exports = function (ipcMain) {
    return new ProjectEventMainProcController(ipcMain);
}

