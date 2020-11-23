import {RendererProcessEventHandler} from "./renderer-process-event.handler";

export class WorkspaceEventHandler extends RendererProcessEventHandler {

    constructor() {
        super();
        const handleProjectOpenedEvent = this.handleProjectOpenedEvent.bind(this);
        this.ipcRenderer.on('open-project-complete', handleProjectOpenedEvent);
    }

    handleProjectOpenedEvent(event, arg) {
        console.log("project opened");
        console.log(arg)
    }

    openProject() {
        window.ipcRenderer.send('open-project', '')
    }

}