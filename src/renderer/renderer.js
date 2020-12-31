import {WorkspaceRendererEventHandler} from "./workspace-renderer-event.handler";
import {DataModelRendererEventHandler} from "./data-model-renderer-event.handler";

let workspaceHandler = new WorkspaceRendererEventHandler();
let dataModelHandler = new DataModelRendererEventHandler();

export function getRenderer() {
  return {
    getWorkspaceHandler: () => {
      return workspaceHandler;
    },
    getDataModelHandler: () => {
      return dataModelHandler;
    }
  }
}