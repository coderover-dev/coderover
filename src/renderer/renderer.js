import {WorkspaceRendererEventHandler} from "./workspace-renderer-event.handler";
import {ResourceRendererEventHandler} from "./resource-renderer-event.handler";


let workspaceHandler = new WorkspaceRendererEventHandler();
let resourceHandler = new ResourceRendererEventHandler();

export function getRenderer() {
  return {
    getWorkspaceHandler: () => {
      return workspaceHandler;
    },
    getResourceHandler: () => {
      return resourceHandler;
    }
  }
}