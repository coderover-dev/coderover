import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {PrimarySidebar} from "./PrimarySidebar";
import {Divider} from "@material-ui/core";
import {Breadcrumb} from "./Breadcrumb";
import {Toolbar} from "./Toolbar";
import {SecondarySidebar} from "./SecondarySidebar";
import './Workspace.css'
import {workspaceData} from "../../shared/workspace-data";
import {DataModelView} from "../DataModelView/DataModelView";
import {
  dataModelListSubject,
  dataModelSubject,
  secondarySidebarSubject,
  tabBarSubject,
  workspaceSubject
} from "../../shared/workspace-events";
import {ComponentTabBar} from "./ComponentTabBar";
import {v4 as uuidv4} from "uuid";

export class WorkspaceView extends React.Component {

  constructor(props) {
    super(props);
    this.sidebar = true;
    this.state = {
      tabs: {},
      dataModels: {},
      selectedPrimaryMenu: null,
      currentTab: null,
      currentTabIdx: 0,
      component: ""
    }
  }

  componentDidMount() {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.tabBarSubscription = tabBarSubject.subscribe(this.openTab.bind(this));
    this.dataModelSubscription = dataModelSubject.subscribe(this.loadDataModel.bind(this));
    this.dataModelListSubscription = dataModelListSubject.subscribe((dataModels) => {
      this.setState({dataModels: dataModels})
      secondarySidebarSubject.next(dataModels);
    })
  }

  componentWillUnmount() {
    this.tabBarSubscription.unsubscribe();
    this.dataModelSubscription.unsubscribe();
    this.dataModelListSubscription.unsubscribe();
  }

  openTab(tab) {
    // populate the tab props such as component id and name
    this.fillTabComponentProps(tab);

    // check if the tab already exists in the open tabs
    // if exists then get the tab id from the open tabs object
    let currentTabId = this.getOpenTabId(tab);

    // if currentId is null then the tab is not open yet
    // else the tab is already open, set the currentTab to the currentTabId to focus the tab
    if (currentTabId == null) {
      let tabs = this.state.tabs;
      tabs[tab.tabId] = tab;
      this.setState({tabs: tabs, currentTab: tab.tabId});
    } else {
      this.setState({currentTab: currentTabId});
    }
  }

  fillTabComponentProps(tab) {
    let tabType = tab.componentType;
    if (tab.data == null || Object.keys(tab.data).length === 0) {
      return;
    }

    switch (tabType.toUpperCase()) {
      case "DATA_MODEL":
        tab.componentId = tab.data.id;
        tab.componentName = tab.data.dataModelName;
        break;
      default:
        break;
    }
  }

  getDataModelFieldMapping() {
    let dataModelFieldMapping = {}
    Object
      .keys(this.state.dataModels)
      .map(dataModel => {
        let fields = this.state.dataModels[dataModel].fields;
        let fieldNameList = [];
        for (let i = 0; i < fields.length; i++) {
          fieldNameList.push(fields[i].fieldName);
        }
        dataModelFieldMapping[dataModel] = fieldNameList;
      })
    return dataModelFieldMapping;
  }

  loadDataModel(metadata) {
    if (this.state !== undefined && metadata != null) {
      tabBarSubject.next({
        data: metadata,
        componentType: "DATA_MODEL",
        tabId: uuidv4()
      })
    } else {
      tabBarSubject.next({
        data: {},
        componentType: "DATA_MODEL",
        tabId: uuidv4()
      })
    }
  }

  getOpenTabId(openTab) {
    if (openTab == null || Object.keys(openTab.data).length === 0)
      return null;

    let openTabIds = Object.keys(this.state.tabs);
    for (let i = 0; i < openTabIds.length; i++) {
      let tab = this.state.tabs[openTabIds[i]];
      if (tab.componentType === openTab.componentType && tab.componentId === openTab.componentId) {
        return tab.tabId;
      }
    }

    return null;
  }

  getSidebarContent() {
    if (this.sidebar) {
      return (
        <Grid container item
              style={{
                width: '80px',
                alignContent: "flex-start",
                borderRight: "1px solid #cecece"
              }}>
          <PrimarySidebar selected={this.state.selectedPrimaryMenu}
                          onSelection={(selectedMenu)=>{
                            console.log(selectedMenu)
                            this.setState({selectedPrimaryMenu: selectedMenu});
                          }}/>
        </Grid>
      )
    }
  }

  getTabs() {
    return (
      <Grid item container
            style={{
              height: "50px",
              paddingTop: "5px",
              paddingLeft: "2px",
              borderBottom: "1px solid #cecece",
              backgroundColor: "var(--bg-primary--shade--two)"
            }}>
        <Grid item xs={12}>
          <ComponentTabBar currentTab={this.state.currentTab}
                           value={this.state.currentTabIdx}
                           onTabSelection={(tabId) => {
                             this.setState({currentTab: tabId, currentTabIndex: this.getTabIdx(tabId)});
                           }}
                           tabs={this.state.tabs}/>
          {
            Object.keys(this.state.tabs)
              .map((tabId) => {
                let tab = this.state.tabs[tabId];
                if (Object.keys(tab).length > 0) {
                  return this.getTabContent(tab);
                } else {
                  return (<div/>);
                }
              })
          }
        </Grid>
      </Grid>
    )
  }


  getTabIdx(tabId) {
    for (let i = 0; i < this.state.tabs.length; i++) {
      if (this.state.tabs[i].tabId === tabId)
        return i;
    }

    return 0;
  }

  onTabUpdate(tabId, data) {
    console.log("onTabUpdate",tabId);
    let tabs = this.state.tabs;
    tabs[tabId].data = data;
    this.fillTabComponentProps(tabs[tabId]);
    this.setState({tabs: tabs});
  }

  getTabContent(tab) {
    let content = null;
    switch (tab.componentType.toUpperCase()) {
      case "DATA_MODEL":
        content = (
          <DataModelView data={tab.data}
                         dataModelFieldMap={this.getDataModelFieldMapping()}
                         onUpdate={(data) => this.onTabUpdate(tab.tabId, data)}/>
        );
        break;
      default:
        content = (<div/>);
        break;
    }

    return (
      <div
        role="tabpanel"
        hidden={this.state.currentTab !== tab.tabId}
        id={`tab-content-${tab.tabId}`}
        aria-labelledby={`tab-content-${tab.tabId}`}>
        {content}
      </div>
    );
  }

  getComponentsForSecondarySidebar(selectedMenuKey){
    switch (selectedMenuKey) {
      case "DATA_MODEL":
        return this.state.dataModels;
      default:
        return {};
    }

  }

  getContentContainer() {
    if (this.sidebar) {
      return (
        <Grid container item style={{
          width: 'calc(100% - 80px)',
          alignContent: "flex-start"
        }}>
          <Grid item style={{width: '240px'}}>
            <SecondarySidebar componentType={this.state.selectedPrimaryMenu}
                              components={this.getComponentsForSecondarySidebar(this.state.selectedPrimaryMenu)}/>
          </Grid>
          <Grid item style={{
            width: 'calc(100% - 240px)',
            height: 'calc(100vh - 68px)',
            overflow: "auto"
          }}>
            {this.getTabs()}
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container item
              style={{
                width: '100%',
                alignContent: "flex-start"
              }}>
          <Grid item style={{width: '240px'}}>
            <SecondarySidebar componentType={this.state.selectedPrimaryMenu}
                              components={this.getComponentsForSecondarySidebar(this.state.selectedPrimaryMenu)}/>
          </Grid>
          <Grid item style={{
            width: 'calc(100% - 240px)',
            height: 'calc(100vh - 68px)',
            overflow: "auto"
          }}>
            {this.getTabs()}
          </Grid>
        </Grid>
      )
    }
  }


  render() {
    return (
      <Grid container style={{flexDirection: "row", height: '100vh', width: '100vw'}}>
        <Grid item style={{height: '68px', width: '100%', flexDirection: "column", zIndex: 1}}>
          <Toolbar onSidebarToggle={() => {
            this.sidebar = !this.sidebar;
            this.forceUpdate(() => {
            });
          }}/>
          <Divider style={{backgroundColor: '#cecece'}}/>
          <Breadcrumb/>
          <Divider style={{backgroundColor: '#cecece'}}/>
        </Grid>
        <Grid container item style={{height: 'calc(100vh - 68px)'}}>
          {this.getSidebarContent()}
          {this.getContentContainer()}
        </Grid>
      </Grid>

    );
  }
}