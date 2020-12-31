import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {faCube, faDatabase, faSlidersH, faCog, faFlask} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import {breadcrumbSubject} from "./Breadcrumb";
import {workspaceData} from "../../shared/workspace-data";
import {workspaceSubject} from "../../shared/workspace-events";

export class PrimarySidebar extends React.Component {
  createSidebarItem(icon, key, text) {
    return (
      <ListItem button style={{height: '32px', paddingLeft: '20px'}}
                onClick={() => {
                  breadcrumbSubject.next({
                    project: workspaceData.project.name,
                    component: text
                  });

                  workspaceData.selectedComponent = {
                    key: key,
                    text: text
                  }

                  workspaceSubject.next(0);
                }}>
        <ListItemIcon style={{minWidth: '24px'}} className="sidebarMenuItem">
          <FontAwesomeIcon icon={icon}/>
        </ListItemIcon>
        <ListItemText>
          <span className="sidebarMenuItem">{text}</span>
        </ListItemText>
      </ListItem>
    )
  }

  render() {
    return (
      <Grid container style={{
        flexDirection: "column",
        paddingTop: '5px',
        borderRight: '2px',
        borderRightColor: "#cecece"
      }}>
        <List component="nav"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Workspace
                </ListSubheader>
              }>
          {this.createSidebarItem(faDatabase, "DATA_MODELS", "Data Models")}
          {this.createSidebarItem(faCube, "RESOURCES", "Resources")}
          {this.createSidebarItem(faSlidersH, "PROFILES", "Profiles")}
          {this.createSidebarItem(faCog, "SETTINGS", "Settings")}
          {this.createSidebarItem(faFlask, "NA", "Console")}
        </List>
      </Grid>
    )
  }
}

