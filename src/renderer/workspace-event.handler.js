import {RendererProcessEventHandler} from "./renderer-process-event.handler";
import {pushAlert, ALERT_OK} from "../components/alert/Alerts"

export class WorkspaceEventHandler extends RendererProcessEventHandler {

    constructor() {
        super();
        const handleProjectOpenedEvent = this.handleProjectOpenedEvent.bind(this);
        const handleWorkspaceSelectedEvent = this.handleWorkspaceSelectedEvent.bind(this);
        const handleProjectCreatedEvent = this.handleProjectCreatedEvent.bind(this);
        const handleProjectCreationFailureEvent = this.handleProjectCreationFailureEvent.bind(this);

        this.ipcRenderer.on('project-opened', handleProjectOpenedEvent);
        this.ipcRenderer.on('workspace-selected', handleWorkspaceSelectedEvent);
        this.ipcRenderer.on('project-created', handleProjectCreatedEvent);
        this.ipcRenderer.on('project-creation-failed', handleProjectCreationFailureEvent);
    }

    handleProjectOpenedEvent(event, arg) {
    }

    handleWorkspaceSelectedEvent(event, arg) {
        let location = null;
        if (arg !== undefined && arg != null &&
            arg.filePaths != null && arg.filePaths.length > 0) {
            location = arg.filePaths[0];
        }

        if (this.onWorkspaceSelection !== undefined) {
            this.onWorkspaceSelection(location);
        }
    }

    handleProjectCreatedEvent(event, args) {
        if (this.newProjectCallback != null) {
            this.newProjectCallback();
        }
    }

    handleProjectCreationFailureEvent(event, args) {
        pushAlert('PROJECT_CREATION_FAILED', ALERT_OK,
            args.message.summary, args.message.description,
            () => {
            }, () => {
            });
        if (this.newProjectCallback != null) {
            this.newProjectCallback();
        }
    }

    newProject(projectData, callback) {
        this.newProjectCallback = callback;
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