const generatorFactory = require('../generators/generator-factory');
const workspace = require('../workspace');

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
        const handleCreateProjectEvent = this.handleCreateProjectEvent.bind(this);

        this.ipcMain.on('open-project', handleOpenProjectEvent);
        this.ipcMain.on('select-workspace', handleSelectWorkspaceEvent);
        this.ipcMain.on('create-project', handleCreateProjectEvent);
    }

    handleOpenProjectEvent(event, args) {
        this.event = event;
        this.replyEventName = 'project-opened';
        electron.dialog.showOpenDialog({properties: ["openDirectory"]})
            .then(this.handleOpenProjectSuccess)
            .catch(this.handleOpenProjectError)
    }

    handleSelectWorkspaceEvent(event, args) {
        this.event = event;
        this.replyEventName = 'workspace-selected';
        electron.dialog.showOpenDialog({properties: ["openDirectory"]})
            .then(this.handleSelectWorkspaceSuccess)
            .catch(this.handleSelectWorkspaceError)
    }

    handleCreateProjectEvent(event, args) {
        this.event = event;
        this.args = args;
        console.log(args);
        const result = workspace.createProject(this.args.location);
        if (result != null && result.success) {
            generatorFactory
                .getGenerator()
                .getBaseBlueprintGenerator()
                .generate(args);
            this.replyEventName = 'project-created';
            this.handleSelectWorkspaceSuccess(null);
        } else {
            this.replyEventName = 'project-creation-failed';
            this.event.reply(this.replyEventName, {
                message: result.message,
                error: true
            });
        }
    }

}

module.exports = function (ipcMain) {
    return new WorkspaceEventHandler(ipcMain);
}

