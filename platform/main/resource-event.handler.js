const generatorFactory = require('../generators/generator-factory');
const workspace = require('../workspace');

const electron = require('electron');
const MainProcessEventHandler = require('./main-process-event.handler');

class ResourceMainEventHandler extends MainProcessEventHandler {

  constructor(ipcMain) {
    super(ipcMain)
    this._registerEvents();
  }

  _registerEvents() {

    const handleFetchDataModels = this.handleFetchDataModelsEvent.bind(this);
    this.ipcMain.on('FetchDataModels', handleFetchDataModels);

    const handlePersistResource = this.handlePersistResourceEvent.bind(this);
    this.ipcMain.on('PersistResource', handlePersistResource);

  }

  handleFetchDataModelsEvent(event, args) {
    this.event = event;
    let error = false;
    const result = electron.dialog.showOpenDialogSync({properties: ["openDirectory"]})
    if (result != null && result.length > 0) {
      const location = result[0];
      console.log(location)
      try {
        if (workspace.validateProjectDir(location)) {
          this.replyEventName = 'DataModelsFetched';
          this.event.reply(
            this.replyEventName, {
              success: true
            });
        } else {
          error = true;
        }
      } catch (err) {
        error = true;
      }
    } else {
      error = true;
    }

    if (error) {
      this.replyEventName = 'FetchDataModelsFailed';
      this.event.reply(this.replyEventName, {
        message: {
          summary: "Invalid metadata",
          description: "Could not retrieve the registered data models for the current project."
        },
        success: false
      });
    }
  }

  handlePersistResourceEvent(event, args) {
    this.event = event;
    let error = false;
    this.args = args;
    console.log(this.args);
  }


}

module.exports = function (ipcMain) {
  return new ResourceMainEventHandler(ipcMain);
}

