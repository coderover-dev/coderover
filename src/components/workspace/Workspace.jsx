import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Sidebar} from "./Sidebar";
import {Divider} from "@material-ui/core";
import {Breadcrumbs} from "./Breadcrumbs";
import {Toolbar} from "./Toolbar";
import {ItemListView} from "./ItemListView";
import './workspace.css'

export class Workspace extends React.Component {

    constructor() {
        super();
        this.sidebar = true;
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

    getContentContainer() {
        if (this.sidebar) {
            return (
                <Grid container item
                      style={{
                          width: 'calc(100vw - 240px)',
                          alignContent: "flex-start"
                      }}>
                    <ItemListView/>
                </Grid>
            )
        } else {
            return (
                <Grid container item
                      style={{
                          width: '100vw',
                          alignContent: "flex-start"
                      }}>
                    <ItemListView/>
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
                        this.forceUpdate(() => {});
                    }}/>
                    <Divider style={{backgroundColor: '#cecece'}}/>
                    <Breadcrumbs/>
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