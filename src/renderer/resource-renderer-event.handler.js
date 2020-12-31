import {RendererProcessEventHandler} from "./renderer-process-event.handler";
import {pushAlert, ALERT_OK} from "../components/alert/Alerts"
import {openWorkspace} from "../shared/workspace-events";

export class ResourceRendererEventHandler extends RendererProcessEventHandler {

  constructor() {
    super();

    const handleFetchDataModelsFailed = this.handleFetchDataModelsFailedEvent.bind(this);
    this.ipcRenderer.on('FetchDataModelsFailed', handleFetchDataModelsFailed);

    const handleDataModelsFetched = this.handleDataModelsFetchedEvent.bind(this);
    this.ipcRenderer.on('DataModelsFetched', handleDataModelsFetched);

    const persistResourceFailed = this.persistResourceFailedEvent.bind(this);
    this.ipcRenderer.on('PersistResourceFailed', persistResourceFailed);

    const resourcePersisted = this.resourcePersistedEvent.bind(this);
    this.ipcRenderer.on('ResourcePersisted', resourcePersisted);

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

  resourcePersistedEvent(event, args) {
    if (args.success) {
      //openWorkspace();
    } else {
      pushAlert('ResourcePersisted', ALERT_OK,
        args.message.summary, args.message.description,
        () => {
        }, () => {
        });
    }
  }

  persistResourceFailedEvent(event, args) {
    pushAlert('PersistResourceFailed', ALERT_OK,
      args.message.summary, args.message.description,
      () => {
      }, () => {
      });
  }

  fetchDataModels(projectMetadata) {
    window.ipcRenderer.send('FetchDataModels', projectMetadata);
  }

  persistResource(projectMetadata, resourceMetadata) {
    window.ipcRenderer.send('PersistResource', {
      projectMetadata: projectMetadata,
      resourceMetadata: resourceMetadata
    });
  }

}