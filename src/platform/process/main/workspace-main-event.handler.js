const electron = require('electron');

class WorkspaceMainEventHandler {

    constructor(ipcMain) {
        this.event = null;
        this.arg = null;
        this.ipcMain = ipcMain;
    }

    initEvents() {
        const handleOpenProjectEvent = this.handleOpenProjectEvent.bind(this);
        this.ipcMain.on('open-project', handleOpenProjectEvent);
    }

    handleOpenProjectEvent(event, arg) {
        this.event = event;
        this.arg = arg;

        let handleOpenProjectSuccess = this.onOpenProjectSuccess.bind(this);
        let handleOpenProjectError = this.onOpenProjectError.bind(this);

        electron.dialog.showOpenDialog({properties: ["openDirectory"]})
            .then(handleOpenProjectSuccess)
            .catch(handleOpenProjectError)
    }

    onOpenProjectSuccess(result) {
        this.event.reply('project-opened', {
            canceled: result.canceled,
            filePaths: result.filePaths
        })
    }

    onOpenProjectError(error) {
        console.log(error)
        this.event.reply('project-opened', {
            error: true
        })
    }


}

module.exports = function (ipcMain) {
    return new WorkspaceMainEventHandler(ipcMain);
}

