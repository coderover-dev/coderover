const projectEventController = require('./project');

module.exports.initMainControllers = function(ipcMain){
    projectEventController(ipcMain).initEvents();
}