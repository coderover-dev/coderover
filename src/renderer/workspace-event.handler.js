import {RendererProcessEventHandler} from "./renderer-process-event.handler";

export class WorkspaceEventHandler extends RendererProcessEventHandler {

    constructor() {
        super();
        const handleProjectOpenedEvent = this.handleProjectOpenedEvent.bind(this);
        const handleWorkspaceSelectedEvent = this.handleWorkspaceSelectedEvent.bind(this);
        const handleProjectCreatedEvent = this.handleProjectCreatedEvent.bind(this);

        this.ipcRenderer.on('project-opened', handleProjectOpenedEvent);
        this.ipcRenderer.on('workspace-selected', handleWorkspaceSelectedEvent);
        this.ipcRenderer.on('project-created', handleProjectCreatedEvent);
    }

    handleProjectOpenedEvent(event, arg) {
        console.log("project opened");
        console.log(arg)
    }

    handleWorkspaceSelectedEvent(event, arg) {
        console.log("workspace selected");
        console.log(arg)

        let location = null;
        if (arg !== undefined && arg != null &&
            arg.filePaths != null && arg.filePaths.length > 0) {
            location = arg.filePaths[0];
        }

        if (this.onWorkspaceSelection !== undefined) {
            this.onWorkspaceSelection(location);
        }
    }

    handleProjectCreatedEvent(event, arg) {
        console.log("project created");
        console.log(arg);
        this.onProjectCreated();
    }

    newProject(projectData, callback) {
        console.log("create-project :: ")
        console.log(projectData)
        this.onProjectCreated = callback;
        window.ipcRenderer.send('create-project', projectData)
    }

    selectWorkspace(callback) {
        this.onWorkspaceSelection = callback;
        window.ipcRenderer.send('select-workspace', '')
    }

    openProject() {
        window.ipcRenderer.send('open-project', '')
    }

}