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
import {dataModelSubject, tabBarSubject, workspaceSubject} from "../../shared/workspace-events";
import {ComponentTab, ComponentTabs} from "./ComponentTabs";

export class WorkspaceView extends React.Component {

  constructor(props) {
    super(props);
    this.sidebar = true;
    this.state = {
      tabs: {},
      dataModels: {},
      currentTab: null,
      component: ""
    }
    this.workspaceUpdateSubscription =
      workspaceSubject.subscribe((data) => {
        this.setState({component: workspaceData.selectedComponent.key});
      })
    this.tabBarSubscription =
      tabBarSubject.subscribe((tabConfig) => {
        // check if the tab already exists in the open tabs
        // if exists then get the tab id from the open tabs object
        let currentTabId = this.getOpenTabId(tabConfig);
        // if currentId is null then the tab is not open yet
        // else the tab is already open, set the currentTab to the currentTabId to focus the tab
        if (currentTabId == null) {
          let tabs = this.state.tabs;
          tabs[tabConfig.tabId] = tabConfig;
          this.setState({tabs: tabs, currentTab: tabConfig.tabId});
        } else {
          this.setState({currentTab: currentTabId});
        }
      });
  }

  componentWillUnmount() {
    this.workspaceUpdateSubscription.unsubscribe();
    this.tabBarSubscription.unsubscribe();
  }

  getOpenTabId(tabConfig) {
    console.log(tabConfig)
    if (tabConfig.componentId == null)
      return false;

    let openTabIds = Object.keys(this.state.tabs);
    console.log(openTabIds)
    for (let i = 0; i < openTabIds.length; i++) {
      let tab = this.state.tabs[openTabIds[i]];
      if (tab.componentType === tabConfig.componentType && tab.componentId === tabConfig.componentId) {
        return tab.tabId;
      }
    }

    return null;
  }

  removeTab(tabConfig) {
    let tabs = this.state.tabs;
    delete tabs[tabConfig.tabId];
    this.setState({tabs: this.state.tabs});
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
          <PrimarySidebar/>
        </Grid>
      )
    }
  }

  getTab(tab) {
    return (
      <ComponentTab selectedTab={this.state.currentTab}
                    data={tab}
                    onTabSelection={(selectedTab) => {
                      this.setState({currentTab: selectedTab.tabId})
                    }}
                    onClose={(tab) => this.removeTab(tab)}/>
    )
  }

  getTabContent(tab) {
    console.log(tab)
    let content = null;
    switch (tab.componentType.toUpperCase()) {
      case "DATA_MODELS":
        content = (
          <DataModelView dataModelName={tab.componentName}
                         content={dataModelSubject}
                         onClose={() => this.removeTab(tab)}/>
        );
        break;
      default:
        content = (<div/>);
        break;
    }

    console.log("tabContent", this.state.currentTab, tab.tabId)
    return (
      <div
        role="tabpanel"
        hidden={this.state.currentTab !== tab.tabId}
        id={`componentTab-panel-${this.state.currentTab}`}
        aria-labelledby={`componentTab-panel-${this.state.currentTab}`}>
        {content}
      </div>
    );
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
          <ComponentTabs value={this.state.currentTab}>
            {
              Object
                .keys(this.state.tabs)
                .map((tabKey, tabIndex) => {
                  console.log(tabKey)
                  let tab = this.state.tabs[tabKey];
                  return this.getTab(tab);
                })
            }
          </ComponentTabs>
          {
            Object
              .keys(this.state.tabs)
              .map((tabKey, tabIndex) => {
                let tab = this.state.tabs[tabKey];
                return this.getTabContent(tab);
              })
          }

        </Grid>
      </Grid>
    )
  }

  getContentContainer() {
    if (this.sidebar) {
      return (
        <Grid container item style={{
          width: 'calc(100% - 80px)',
          alignContent: "flex-start"
        }}>
          <Grid item style={{width: '240px'}}>
            <SecondarySidebar/>
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
            <SecondarySidebar/>
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