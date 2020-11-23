const workspaceMainEventHandler = require('./main/workspace-main-event.handler');

module.exports.registerMainEventHandlers = function(ipcMain){
    workspaceMainEventHandler(ipcMain).initEvents();
}