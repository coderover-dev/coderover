import {Subject} from "rxjs";
import {workspaceData} from "./workspace-data";
import {breadcrumbSubject} from "../views/WorkspaceView/Breadcrumb";

export let secondarySidebarSubject = new Subject();

export function loadSecondarySidebarItems(items){
  secondarySidebarSubject.next(items);
}

export let workspaceSubject = new Subject();

export function openWorkspace(projectMetadata) {
  workspaceData.init = true;
  workspaceData.project = projectMetadata;
  workspaceSubject.next(0);
  breadcrumbSubject.next({
    project: projectMetadata.name,
    component: ""
  });
}

export function closeWorkspace() {
  workspaceData.init = false;
  workspaceData.project = {};
  workspaceSubject.next(0);
}