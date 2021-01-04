import {ReplaySubject, Subject} from "rxjs";
import {workspaceData} from "./workspace-data";
import {breadcrumbSubject} from "../views/WorkspaceView/Breadcrumb";

export let secondarySidebarSubject = new ReplaySubject(1);
export let workspaceSubject = new ReplaySubject(1);

export let dataModelListSubject = new ReplaySubject(1);
export let dataModelSubject = new ReplaySubject(1);

export let tabBarSubject = new ReplaySubject(1);

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