import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {faCube, faDatabase, faBook, faSlidersH, faCog, faTerminal, faFlask} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

export class Sidebar extends React.Component {
    createSidebarItem(icon, text) {
        return (
            <ListItem button style={{height: '32px', paddingLeft: '20px'}}>
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
                borderRight: '2px',
                borderRightColor: "#cecece"
            }}>
                <List component="nav"
                      subheader={
                          <ListSubheader component="div" id="nested-list-subheader">
                              Workspace
                          </ListSubheader>
                      }>
                    {this.createSidebarItem(faDatabase, "Data Models")}
                    {this.createSidebarItem(faCube, "Resources")}
                    {this.createSidebarItem(faSlidersH, "Profiles")}
                    {this.createSidebarItem(faCog, "Settings")}
                    {this.createSidebarItem(faFlask, "Console")}
                </List>
            </Grid>
        )
    }
}

