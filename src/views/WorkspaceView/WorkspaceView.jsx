import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Sidebar} from "./Sidebar";
import {Divider} from "@material-ui/core";
import {Breadcrumb} from "./Breadcrumb";
import {Toolbar} from "./Toolbar";
import {ItemListView} from "./ItemListView";
import './Workspace.css'
import {workspaceData} from "../../shared/workspace-data";
import {ManageDataModelView} from "../ManageDataModelView/ManageDataModelView";
import {workspaceSubject} from "../../shared/workspace-events";

export class WorkspaceView extends React.Component {

    constructor(props) {
        super(props);
        this.sidebar = true;
        this.state = {
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
                          padding: 5,
                          width: '240px',
                          alignContent: "flex-start",
                          backgroundColor: "#d3dce3"
                      }}>
                    <Sidebar/>
                </Grid>
            )
        }
    }

    getDataModelView() {
        return (<ManageDataModelView/>);
    }

    getContent() {
        switch (workspaceData.selectedComponent.key.toUpperCase()) {
            case "DATA_MODELS":
                return this.getDataModelView();
            default:
                return (<div/>);
        }
    }

    getContentContainer() {
        if (this.sidebar) {
            return (
                <Grid container item
                      style={{
                          width: 'calc(100% - 240px)',
                          alignContent: "flex-start"
                      }}>
                    <Grid container>
                        <Grid item style={{width: '240px'}}>
                            <ItemListView/>
                        </Grid>
                        <Grid item style={{width: 'calc(100% - 240px)'}}>
                            {this.getContent()}
                        </Grid>
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
                        <ItemListView/>
                    </Grid>
                    <Grid item style={{width: 'calc(100% - 240px)'}}>
                        {this.getContent()}
                    </Grid>
                </Grid>
            )
        }
    }


    render() {
        return (
            <Grid container style={{flexDirection: "row", height: '100vh'}}>
                <Grid item style={{height: '68px', width: '100vw', flexDirection: "column", zIndex: 1}}>
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