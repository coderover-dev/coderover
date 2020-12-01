import {RendererProcessEventHandler} from "./renderer-process-event.handler";
import {pushAlert, ALERT_OK} from "../components/alert/Alerts"
import {openWorkspace} from "../data/workspaceMetadata"

export class WorkspaceEventHandler extends RendererProcessEventHandler {

    constructor() {
        super();

        const handleProjectOpened = this.handleProjectOpenedEvent.bind(this);
        this.ipcRenderer.on('ProjectOpened', handleProjectOpened);

        const handleOpenProjectFailed = this.handleProjectOpenedEvent.bind(this);
        this.ipcRenderer.on('OpenProjectFailed', handleOpenProjectFailed);

        const handleWorkspaceSelected = this.handleWorkspaceSelectedEvent.bind(this);
        this.ipcRenderer.on('WorkspaceSelected', handleWorkspaceSelected);

        const handleProjectCreated = this.handleProjectCreatedEvent.bind(this);
        this.ipcRenderer.on('ProjectCreated', handleProjectCreated);

        const handleCreateProjectFailed = this.handleCreateProjectFailedEvent.bind(this);
        this.ipcRenderer.on('CreateProjectFailed', handleCreateProjectFailed);
    }

    handleProjectOpenedEvent(event, args) {
        if (args.success) {
            openWorkspace();
        } else {
            pushAlert('OpenProjectFailed', ALERT_OK,
                args.message.summary, args.message.description,
                () => {
                }, () => {
                });
        }
    }

    handleWorkspaceSelectedEvent(event, args) {
        let location = null;
        if (args !== undefined && args != null &&
            args.filePaths != null && args.filePaths.length > 0) {
            location = args.filePaths[0];
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

    handleCreateProjectFailedEvent(event, args) {
        pushAlert('CreateProjectFailed', ALERT_OK,
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
        window.ipcRenderer.send('CreateProject', projectData)
    }

    selectWorkspace(callback) {
        this.onWorkspaceSelection = callback;
        window.ipcRenderer.send('SelectWorkspace', '')
    }

    openProject() {
        window.ipcRenderer.send('OpenProject', '')
    }

}