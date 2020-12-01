const workspaceMainEventHandler = require('./workspace-event.handler');

module.exports.registryMainProcessEvents = function(ipcMain){
    workspaceMainEventHandler(ipcMain);
}