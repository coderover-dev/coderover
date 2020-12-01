import {Subject} from "rxjs";

export let onWorkspaceUpdate = new Subject();

export function openWorkspace() {
    workspaceMetadata.init = true;
    onWorkspaceUpdate.next(0);
}

export function closeWorkspace(){
    workspaceMetadata.init = false;
    workspaceMetadata.project = {};
    onWorkspaceUpdate.next(0);
}

export let workspaceMetadata = {
    init: false,
    project: {
        name: "",
        workspace: "",
        location: "",
        type: "",
        platform: "",
        framework: ""
    }
}