export class RendererProcessEventHandler {

    constructor() {
        this.ipcRenderer = window.ipcRenderer;
        this.event = null;
        this.arg = null;
        this.replyEventName = null;
    }

    handleSuccess(result) {

    }

    handleError(error) {
    }

}