import {RendererProcessEventHandler} from "./renderer-process-event.handler";
import {pushAlert, ALERT_OK} from "../components/alert/Alerts"
import {openWorkspace, secondarySidebarSubject} from "../shared/workspace-events";
import {workspaceData} from "../shared/workspace-data";

export class DataModelRendererEventHandler extends RendererProcessEventHandler {

  constructor() {
    super();

    const handleFetchDataModelsFailed = this.handleFetchDataModelsFailedEvent.bind(this);
    this.ipcRenderer.on('FetchDataModelsFailed', handleFetchDataModelsFailed);

    const handleDataModelsFetched = this.handleDataModelsFetchedEvent.bind(this);
    this.ipcRenderer.on('DataModelsFetched', handleDataModelsFetched);

    const persistDataModelFailed = this.persistDataModelFailedEvent.bind(this);
    this.ipcRenderer.on('PersistDataModelFailed', persistDataModelFailed);

    const dataModelPersisted = this.dataModelPersistedEvent.bind(this);
    this.ipcRenderer.on('DataModelPersisted', dataModelPersisted);
  }

  fetchDataModels(projectMetadata) {
    window.ipcRenderer.send('FetchDataModels', projectMetadata);
  }

  handleDataModelsFetchedEvent(event, args) {
    if (args.success) {
      workspaceData.dataModels = args.dataModels;
      secondarySidebarSubject.next(workspaceData.dataModels);
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

  persistDataModel(projectMetadata, resourceMetadata) {
    window.ipcRenderer.send('PersistDataModel', {
      projectMetadata: projectMetadata,
      resourceMetadata: resourceMetadata
    });
  }

  dataModelPersistedEvent(event, args) {
  }

  persistDataModelFailedEvent(event, args) {
    pushAlert('PersistDataModelFailed', ALERT_OK,
      args.message.summary, args.message.description,
      () => {
      }, () => {
      });
  }

}