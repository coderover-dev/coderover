import {RendererProcessEventHandler} from "./renderer-process-event.handler";
import {pushAlert, ALERT_OK} from "../components/alert/Alerts"
import {dataModelSubject, openWorkspace, secondarySidebarSubject} from "../shared/workspace-events";
import {workspaceData} from "../shared/workspace-data";

export class DataModelRendererEventHandler extends RendererProcessEventHandler {

  constructor() {
    super();

    const handleFetchDataModelsFailed = this.handleFetchDataModelsFailedEvent.bind(this);
    this.ipcRenderer.on('FetchDataModelsFailed', handleFetchDataModelsFailed);

    const handleDataModelsFetched = this.handleDataModelsFetchedEvent.bind(this);
    this.ipcRenderer.on('DataModelsFetched', handleDataModelsFetched);

    const handlePersistDataModelFailed = this.handlePersistDataModelFailedEvent.bind(this);
    this.ipcRenderer.on('PersistDataModelFailed', handlePersistDataModelFailed);

    const handleDataModelPersisted = this.handleDataModelPersistedEvent.bind(this);
    this.ipcRenderer.on('DataModelPersisted', handleDataModelPersisted);

    const handleLoadDataModelFailed = this.handleLoadDataModelFailedEvent.bind(this);
    this.ipcRenderer.on('LoadDataModelFailed', handleLoadDataModelFailed);

    const handleDataModelLoaded = this.handleDataModelLoadedEvent.bind(this);
    this.ipcRenderer.on('DataModelLoaded', handleDataModelLoaded);

    const handleDataModelFieldsRetrieved = this.handleDataModelFieldsRetrievedEvent.bind(this);
    this.ipcRenderer.on('DataModelFieldsRetrieved', handleDataModelFieldsRetrieved);

    const handleFetchDataModelFieldsFailed = this.handleFetchDataModelFieldsFailedEvent.bind(this);
    this.ipcRenderer.on('FetchDataModelFieldsFailed', handleFetchDataModelFieldsFailed);

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

  persistDataModel(projectMetadata, dataModelMetadata) {
    window.ipcRenderer.send('PersistDataModel', {
      projectMetadata: projectMetadata,
      dataModelMetadata: dataModelMetadata
    });
  }

  handleDataModelFieldsRetrievedEvent(event, args) {

  }

  handleFetchDataModelFieldsFailedEvent(event, args) {
    pushAlert('FetchDataModelFieldsFailed', ALERT_OK,
      args.message.summary, args.message.description,
      () => {
      }, () => {
      });
  }

  handleDataModelPersistedEvent(event, args) {
  }

  handlePersistDataModelFailedEvent(event, args) {
    pushAlert('PersistDataModelFailed', ALERT_OK,
      args.message.summary, args.message.description,
      () => {
      }, () => {
      });
  }

  fetchDataModel(projectMetadata, dataModelName) {
    window.ipcRenderer.send('LoadDataModel', {
      projectMetadata: projectMetadata,
      dataModelName: dataModelName
    });
  }

  handleDataModelLoadedEvent(event, args) {
    if(args!=null && args.data!=null) {
      dataModelSubject.next(args.data)
    }
  }

  handleLoadDataModelFailedEvent(event, args) {
    pushAlert('LoadDataModelFailed', ALERT_OK,
      args.message.summary, args.message.description,
      () => {
      }, () => {
      });
  }

}