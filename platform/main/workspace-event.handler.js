const electron = require('electron');
const MainProcessEventHandler = require('./main-process-event.handler');

class WorkspaceEventHandler extends MainProcessEventHandler {

    constructor(ipcMain) {
        super(ipcMain)

        this.handleOpenProjectSuccess = this.handleSuccess.bind(this);
        this.handleOpenProjectError = this.handleError.bind(this);

        this.handleSelectWorkspaceSuccess = this.handleSuccess.bind(this);
        this.handleSelectWorkspaceError = this.handleError.bind(this);
    }

    registerAll() {
        const handleOpenProjectEvent = this.handleOpenProjectEvent.bind(this);
        const handleSelectWorkspaceEvent = this.handleSelectWorkspaceEvent.bind(this);

        this.ipcMain.on('open-project', handleOpenProjectEvent);
        this.ipcMain.on('select-workspace', handleSelectWorkspaceEvent);
    }

    handleOpenProjectEvent(event, arg) {
        this.event = event;
        this.replyEventName = 'project-opened';
        electron.dialog.showOpenDialog({properties: ["openDirectory"]})
            .then(this.handleOpenProjectSuccess)
            .catch(this.handleOpenProjectError)
    }

    handleSelectWorkspaceEvent(event, arg) {
        this.event = event;
        this.replyEventName = 'workspace-selected';
        electron.dialog.showOpenDialog({properties: ["openDirectory"]})
            .then(this.handleSelectWorkspaceSuccess)
            .catch(this.handleSelectWorkspaceError)
    }


}

module.exports = function (ipcMain) {
    return new WorkspaceEventHandler(ipcMain);
}

