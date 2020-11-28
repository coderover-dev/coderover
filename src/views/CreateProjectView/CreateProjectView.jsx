import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Grid, IconButton} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {getRenderer} from "../../renderer/renderer";

export class CreateProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.renderer = getRenderer();
        this.state = {
            project: {
                name: "",
                workspace: "",
                location: "",
                type: "",
                platform: "",
                framework: ""
            }
        }
    }

    handleWorkspaceSelection(workspaceLocation) {
        let project = this.state.project;
        project.workspace = workspaceLocation;
        project.location = this.appendProjectName(workspaceLocation);
        this.setState({
            project: project
        })
    }

    appendProjectName(location) {
        if (location == null || location === "") {
            return "";
        }

        let projectName = this.state.project.name;
        if (projectName == null) {
            return location;
        }

        if (location.endsWith("/")) {
            return location + this.state.project.name;
        } else {
            return location + "/" + this.state.project.name;
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} maxWidth={"md"} fullWidth={true}>
                <DialogTitle style={{backgroundColor: "#e7e2e7", fontWeight: "bold"}}>New Project</DialogTitle>
                <DialogContent style={{padding: '20px'}}>
                    {/*<DialogContentText>*/}
                    {/*</DialogContentText>*/}
                    <Grid container
                          direction="column"
                          display="flex"
                          justify="center">
                        <Grid item>

                            {/* project name field : begin */}
                            <Grid container spacing={1} direction="column">
                                <Grid item style={{textAlign: "left", paddingTop: '15px'}}>
                                    Name :
                                </Grid>
                                <Grid item>
                                    <OutlinedInput
                                        id="projectNameTxt"
                                        fullWidth
                                        value={this.state.project.name}
                                        onChange={(event) => {
                                            let project = this.state.project;
                                            project.name = event.target.value;
                                            project.location = this.appendProjectName(project.workspace);
                                            this.setState({
                                                project: project
                                            })
                                        }}
                                        margin="dense"/>
                                </Grid>
                            </Grid>
                            {/* project name field : end */}

                            {/* project location field : begin */}
                            <Grid container spacing={1} direction="column">
                                <Grid item style={{textAlign: "left", paddingTop: '15px'}}>
                                    Location :
                                </Grid>
                                <Grid item>
                                    <OutlinedInput
                                        id="projectNameTxt"
                                        fullWidth
                                        value={this.state.project.location}
                                        margin="dense"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton style={{fontSize: '15pt', height: '10px'}}
                                                            onClick={() => {
                                                                let handleWorkspaceSelection = this.handleWorkspaceSelection.bind(this);
                                                                this.renderer
                                                                    .getWorkspaceHandler()
                                                                    .selectWorkspace(handleWorkspaceSelection)
                                                            }}>
                                                    <FontAwesomeIcon icon={faFolderOpen}/>
                                                </IconButton>
                                            </InputAdornment>
                                        }/>
                                </Grid>
                            </Grid>
                            {/* project location field : end */}


                            {/* project type specific fields : begin */}
                            <Grid container spacing={1} direction="column">
                                <Grid item style={{textAlign: "left", paddingTop: '15px'}}>
                                    Type :
                                </Grid>
                                <Grid item>
                                    <Select
                                        id="projectType" fullWidth
                                        variant="outlined" margin="dense"
                                        value={this.state.project.type}
                                        onChange={(event) => {
                                            let project = this.state.project;
                                            project.type = event.target.value;
                                            this.setState({project: project});
                                        }}>
                                        <MenuItem value={"REST_API"}>REST API</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} direction="column">
                                <Grid item style={{textAlign: "left", paddingTop: '15px'}}>
                                    Platform :
                                </Grid>
                                <Grid item>
                                    <Select
                                        id="projectPlatform" fullWidth
                                        variant="outlined" margin="dense"
                                        value={this.state.project.platform}
                                        onChange={(event) => {
                                            let project = this.state.project;
                                            project.platform = event.target.value;
                                            this.setState({project: project});
                                        }}>
                                        <MenuItem value={"NODE"}>Node</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} direction="column">
                                <Grid item style={{textAlign: "left", paddingTop: '15px'}}>
                                    Framework :
                                </Grid>
                                <Grid item>
                                    <Select
                                        id="projectFramework" fullWidth
                                        variant="outlined" margin="dense"
                                        value={this.state.project.framework}
                                        onChange={(event) => {
                                            let project = this.state.project;
                                            project.framework = event.target.value;
                                            this.setState({project: project});
                                        }}>
                                        <MenuItem value={"EXPRESSJS"}>Express.js</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            {/* project type specific fields : begin */}

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{padding: '20px', marginBottom: '15px'}}>
                    <Grid container spacing={1} direction="row" alignItems="flex-start">
                        <Grid item>
                            <Button onClick={this.props.onConfirm}
                                    className="actionButton"
                                    color="primary" variant="contained">
                                Create
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={this.props.onClose}
                                    className="actionButton"
                                    color="primary" variant="outlined">
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        )
    }

}