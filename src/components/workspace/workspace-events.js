import {Subject} from "rxjs";
import {workspaceMetadata} from "../../data/workspace-metadata";
import {onBreadcrumbUpdate} from "./Breadcrumb";

export let onWorkspaceUpdate = new Subject();

export function openWorkspace(projectMetadata) {
    workspaceMetadata.init = true;
    workspaceMetadata.project = projectMetadata;
    onWorkspaceUpdate.next(0);
    onBreadcrumbUpdate.next({
        project: projectMetadata.name,
        component: ""
    });
}

export function closeWorkspace() {
    workspaceMetadata.init = false;
    workspaceMetadata.project = {};
    onWorkspaceUpdate.next(0);
}