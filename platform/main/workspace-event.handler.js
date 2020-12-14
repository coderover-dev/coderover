const generatorFactory = require('../generators/generator-factory');
const workspace = require('../workspace');

const electron = require('electron');
const MainProcessEventHandler = require('./main-process-event.handler');

class WorkspaceMainEventHandler extends MainProcessEventHandler {

  constructor(ipcMain) {
    super(ipcMain)
    this._registerEvents();
  }

  _registerEvents() {

    const handleSelectWorkspace = this.handleSelectWorkspaceEvent.bind(this);
    this.ipcMain.on('SelectWorkspace', handleSelectWorkspace);

    const handleOpenProject = this.handleOpenProjectEvent.bind(this);
    this.ipcMain.on('OpenProject', handleOpenProject);

    const handleCreateProject = this.handleCreateProjectEvent.bind(this);
    this.ipcMain.on('CreateProject', handleCreateProject);

  }

  handleOpenProjectEvent(event, args) {
    this.event = event;
    let error = false;
    const result = electron.dialog.showOpenDialogSync({properties: ["openDirectory"]});

    try {
      if (result === undefined) {
        this.replyEventName = "OpenProjectCancelled"
        this.event.reply(this.replyEventName, {
          success: true
        });
      } else if (result != null && result.length > 0 && workspace.validateProjectDir(result[0])) {
        let projectMetadata = workspace.loadProjectMetadata(result[0]);
        this.replyEventName = 'ProjectOpened';
        this.event.reply(this.replyEventName, {
          project: projectMetadata,
          success: true
        });
      } else {
        error = true;
      }
    } catch (err) {
      error = true;
    }

    if (error) {
      this.replyEventName = 'OpenProjectFailed';
      this.event.reply(this.replyEventName, {
        message: {
          summary: "Invalid project",
          description: "Cannot open an invalid project directory."
        },
        success: false
      });
    }
  }

  handleSelectWorkspaceEvent(event, args) {
    this.event = event;
    this.replyEventName = 'WorkspaceSelected';
    electron.dialog.showOpenDialog({properties: ["openDirectory"]})
        .then(this.handleSuccess.bind(this))
        .catch(this.handleError.bind(this))
  }

  handleCreateProjectEvent(event, args) {
    this.event = event;
    this.args = args;
    const result = workspace.createProject(this.args.location);
    if (result != null && result.success) {
      generatorFactory
          .getGenerator()
          .getBaseBlueprintGenerator()
          .generate(args);
      this.replyEventName = 'ProjectCreated';
      this.event.reply(this.replyEventName, {
        project: this.args,
        error: false
      });
    } else {
      this.replyEventName = 'CreateProjectFailed';
      this.event.reply(this.replyEventName, {
        message: result.message,
        error: true
      });
    }
  }

}

module.exports = function (ipcMain) {
  return new WorkspaceMainEventHandler(ipcMain);
}

