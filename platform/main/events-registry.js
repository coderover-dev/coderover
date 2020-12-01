const workspaceMainEventHandler = require('./workspace-event.handler');
const dataModelMainEventHandler = require('./data-model-event.handler');

module.exports.registryMainProcessEvents = function(ipcMain){
    workspaceMainEventHandler(ipcMain);
    dataModelMainEventHandler(ipcMain);
}