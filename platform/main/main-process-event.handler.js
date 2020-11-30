const electron = require('electron');

module.exports = class MainProcessEventHandler {
    constructor(ipcMain) {
        this.ipcMain = ipcMain;
        this.event = null;
        this.args = null;
        this.replyEventName = null;
    }

    handleSuccess(result) {
        this.event.reply(this.replyEventName, result)
    }

    handleError(error) {
        this.event.reply(this.replyEventName, {error: true})
    }

}