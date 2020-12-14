import {WorkspaceEventHandler} from "./workspace-event.handler";


let workspaceHandler = new WorkspaceEventHandler();

export function getRenderer() {
  return {
    getWorkspaceHandler: () => {
      return workspaceHandler;
    }
  }
}