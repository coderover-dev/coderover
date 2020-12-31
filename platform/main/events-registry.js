const workspaceMainEventHandler = require('./workspace-event.handler');
const resourceMainEventHandler = require('./resource-event.handler');

module.exports.registryMainProcessEvents = function (ipcMain) {
  workspaceMainEventHandler(ipcMain);
  resourceMainEventHandler(ipcMain);
}