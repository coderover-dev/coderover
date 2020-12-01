import * as React from "react";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBook,
    faDownload,
    faFolderOpen,
    faHammer,
    faPlay, faPlus,
    faWindowClose
} from "@fortawesome/free-solid-svg-icons";

import './Workspace.css'
import {closeWorkspace} from "./workspace-events";

export class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }

    getSidebarToggle() {
        return (
            <ButtonGroup color="primary" variant="outlined"
                         size="small" aria-label="outlined secondary button group">
                <Button className="projectToolbarButton" onClick={this.props.onSidebarToggle}>
                    <FontAwesomeIcon icon={faBars}/>
                </Button>
            </ButtonGroup>
        )
    }

    getProjectToolbar() {
        return (
            <ButtonGroup color="primary" variant="outlined"
                         size="small" aria-label="outlined secondary button group">
                <Button className="projectToolbarButton">
                    <FontAwesomeIcon icon={faFolderOpen}/>
                </Button>
                <Button className="projectToolbarButton">
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <Button className="projectToolbarButton"
                        onClick={() => {
                            closeWorkspace();
                        }}>
                    <FontAwesomeIcon icon={faWindowClose}/>
                </Button>
            </ButtonGroup>
        )
    }

    getActionsToolbar() {
        return (
            <ButtonGroup color="primary" variant="outlined"
                         size="small" aria-label="outlined secondary button group">
                <Button className="actionToolbarButton">
                    <FontAwesomeIcon icon={faPlay}/>
                </Button>
                <Button className="actionToolbarButton">
                    <FontAwesomeIcon icon={faHammer}/>
                </Button>
                <Button className="actionToolbarButton">
                    <FontAwesomeIcon icon={faDownload}/>
                </Button>
                <Button className="actionToolbarButton">
                    <FontAwesomeIcon icon={faBook}/>
                </Button>
            </ButtonGroup>
        )
    }

    render() {
        return (
            <Grid container style={{backgroundColor: "#e7e2e7", height: '44px', padding: 8}}>
                <Grid container item xs={12}>
                    {this.getSidebarToggle()}
                    <span style={{padding: 12}}/>
                    {this.getProjectToolbar()}
                    <span style={{padding: 12}}/>
                    {this.getActionsToolbar()}
                </Grid>
            </Grid>
        );
    }
}