// In renderer process (web page).

export class WorkspaceRendererEventHandler{

    constructor() {
        this.ipcRenderer = window.ipcRenderer;

        const handleProjectOpenedEvent = this.handleProjectOpenedEvent.bind(this);
        this.ipcRenderer.on('project-opened', handleProjectOpenedEvent);
    }

    handleProjectOpenedEvent(event, arg) {
        console.log("project opened");
        console.log(arg)
    }

    openProject() {
        window.ipcRenderer.send('open-project', '')
    }

}

// module.exports = function(){
//     return WorkspaceRendererEventHandler();
// }