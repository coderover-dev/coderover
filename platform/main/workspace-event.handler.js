const electron = require('electron');
const MainProcessEventHandler = require('./main-process-event.handler');

class WorkspaceEventHandler extends MainProcessEventHandler {

    constructor(ipcMain) {
        super(ipcMain)
        this.handleOpenProjectSuccess = this.handleSuccess.bind(this);
        this.handleOpenProjectError = this.handleError.bind(this);

    }

    registerAll() {
        const handleOpenProjectEvent = this.handleOpenProjectEvent.bind(this);
        const handleNewProjectEvent = this.handleNewProjectEvent.bind(this);

        this.ipcMain.on('open-project', handleOpenProjectEvent);
        this.ipcMain.on('new-project', handleNewProjectEvent);
    }

    handleOpenProjectEvent(event, arg) {
        this.event = event;
        this.replyEventName = 'open-project-complete';
        electron.dialog.showOpenDialog({properties: ["openDirectory"]})
            .then(this.handleOpenProjectSuccess)
            .catch(this.handleOpenProjectError)
    }

    handleNewProjectEvent(event, arg) {
        this.event = event;
        this.replyEventName = 'new-project-complete';

        electron.dialog.showOpenDialog({properties: ["openDirectory","createDirectory"]})
            .then(this.handleOpenProjectSuccess)
            .catch(this.handleOpenProjectError)
    }


}

module.exports = function (ipcMain) {
    return new WorkspaceEventHandler(ipcMain);
}

