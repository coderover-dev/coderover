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
import {workspaceSubject} from "../../shared/workspace-events";
import {ComponentTab, ComponentTabs} from "../../components/componentTab/ComponentTab";

export class WorkspaceView extends React.Component {

  constructor(props) {
    super(props);
    this.sidebar = true;
    this.state = {
      currentTab: "",
      component: ""
    }
    this.workspaceUpdateSubscription =
      workspaceSubject.subscribe((data) => {
        this.setState({component: workspaceData.selectedComponent.key});
      })
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

  getDataModelView() {
    return (<DataModelView/>);
  }

  getContent() {
    switch (workspaceData.selectedComponent.key.toUpperCase()) {
      case "DATA_MODELS":
        return this.getDataModelView();
      default:
        return (<div/>);
    }
  }

  getTab(componentType, componentId, componentName) {
    return (
      <ComponentTab componentType={componentType}
                    componentId={componentId}
                    componentName={componentName}/>
    )
  }

  getTabBar() {
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
          <ComponentTabs value={this.state.currentTab}
                         onChange={() => {
                         }}>
            {this.getTab("Data Model", "customer","Customer")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}
            {this.getTab("Data Model", "user","User")}

          </ComponentTabs>
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
            {this.getTabBar()}
            {this.getContent()}
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
            {this.getTabBar()}
            {this.getContent()}
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