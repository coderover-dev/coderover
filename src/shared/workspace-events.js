import {Subject} from "rxjs";
import {workspaceData} from "./workspace-data";
import {breadcrumbSubject} from "../views/WorkspaceView/Breadcrumb";
import {v4 as uuidv4} from "uuid";

export let secondarySidebarSubject = new Subject();
export let workspaceSubject = new Subject();
export let dataModelListSubject = new Subject();
export let dataModelSubject = new Subject();
export let tabBarSubject = new Subject();

export function loadSecondarySidebarItems(items){
  secondarySidebarSubject.next(items);
}

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

export function openTab(componentType, componentId, componentName, tabIndex) {
  tabBarSubject.next({
    tabId: uuidv4(),
    tabIndex: tabIndex,
    componentType: componentType,
    componentId: componentId,
    componentName: componentName
  });
}