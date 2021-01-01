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
import {secondarySidebarSubject, workspaceSubject} from "../../shared/workspace-events";
import {getRenderer} from "../../renderer/renderer";

export class PrimarySidebar extends React.Component {

  constructor(props) {
    super(props);
    this.renderer = getRenderer();
  }

  initMenuContent(key, metadata) {
    switch (key) {
      case "DATA_MODELS":
        this.renderer
          .getDataModelHandler()
          .fetchDataModels(workspaceData.project);
        break;
      default:
        secondarySidebarSubject.next([]);
        break;
    }
  }

  sidebarItem(icon, key, text) {
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
                  this.initMenuContent(key, workspaceData.project);
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
          {this.sidebarItem(faDatabase, "DATA_MODELS", "Data Models")}
          {this.sidebarItem(faCube, "RESOURCES", "Resources")}
          {this.sidebarItem(faSlidersH, "PROFILES", "Profiles")}
          {this.sidebarItem(faCog, "SETTINGS", "Settings")}
          {this.sidebarItem(faFlask, "NA", "Console")}
        </List>
      </Grid>
    )
  }
}

