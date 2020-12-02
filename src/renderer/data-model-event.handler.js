import {RendererProcessEventHandler} from "./renderer-process-event.handler";
import {pushAlert, ALERT_OK} from "../components/alert/Alerts"
import {openWorkspace} from "../shared/workspace-events";

export class DataModelRendererEventHandler extends RendererProcessEventHandler {

    constructor() {
        super();

        const handleFetchDataModelsFailed = this.handleFetchDataModelsFailedEvent.bind(this);
        this.ipcRenderer.on('FetchDataModelsFailed', handleFetchDataModelsFailed);

        const handleDataModelsFetched = this.handleDataModelsFetchedEvent.bind(this);
        this.ipcRenderer.on('DataModelsFetched', handleDataModelsFetched);
    }

    handleDataModelsFetchedEvent(event, args) {
        if (args.success) {
            openWorkspace();
        } else {
            pushAlert('FetchDataModelsFailed', ALERT_OK,
                args.message.summary, args.message.description,
                () => {
                }, () => {
                });
        }
    }

    handleFetchDataModelsFailedEvent(event, args) {
        pushAlert('FetchDataModelsFailed', ALERT_OK,
            args.message.summary, args.message.description,
            () => {
            }, () => {
            });
    }

    fetchDataModels(projectMetadata) {
        window.ipcRenderer.send('FetchDataModels', projectMetadata);
    }

    selectWorkspace(callback) {
        this.onWorkspaceSelection = callback;
        window.ipcRenderer.send('SelectWorkspace', '')
    }

    openProject() {
        window.ipcRenderer.send('OpenProject', '')
    }

}