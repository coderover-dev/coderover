const workspaceMainEventHandler = require('./workspace-main-event.handler');
const dataModelMainEventHandler = require('./data-model-main-event.handler');

module.exports.registryMainProcessEvents = function (ipcMain) {
  workspaceMainEventHandler(ipcMain);
  dataModelMainEventHandler(ipcMain);
}