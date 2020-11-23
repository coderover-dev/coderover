import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import './landingView.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen, faPlus} from "@fortawesome/free-solid-svg-icons";

import {WorkspaceRendererEventHandler} from '../../platform/process/renderer/workspace-renderer-event.handler'

export class LandingView extends React.Component {
    constructor(props) {
        super(props);
        this.workspaceRendererEvtHandler = new WorkspaceRendererEventHandler();
    }
    render() {
        return (
            <Grid container style={{
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "calc((100vw - 650px)/2)",
                backgroundColor: "#E5E4E2",
                height: '100vh', width: '100vw'
            }}>
                <Grid item>
                    <Card style={{
                        width: '650px',
                        height: '400px',
                        color: "#FFFFFF",
                        backgroundColor: "#1569C7",
                        borderRadius: 20
                    }}>
                        <CardContent style={{padding: 0}}>
                            <Grid container>
                                <Grid container item xs={6}
                                      style={{
                                          flexDirection: "column",
                                          backgroundColor: 'white',
                                          color: '#1569C7',
                                          padding: '20px',
                                          textAlign: "left",
                                          fontWeight: 'bold'
                                      }}>
                                    {/*<Typography style={{fontSize: '30pt', fontWeight: "bold"}}>*/}
                                    {/*    CodeRover*/}
                                    {/*</Typography>*/}
                                    <img src="images/logo.png" alt="" style={{width: '280px', paddingLeft:5}}/>

                                    <span style={{
                                        fontSize: '11pt',
                                        paddingTop: '15px'
                                    }}>
                                        A low code platform for developing highly scalable, robust microservices super
                                        fast.
                                    </span>

                                    <span style={{
                                        fontSize: '8pt',
                                        paddingTop: '5px',
                                        color: '#000000'
                                    }}>
                                        v1.0.0-beta
                                    </span>
                                </Grid>
                                <Grid container item xs={6}
                                      spacing={2}
                                      style={{
                                          flexDirection: "column",
                                          padding: '20px',
                                          borderLeft: '1px solid white',
                                          height: "420px",
                                          lineHeight: 1
                                      }}>
                                    <Grid item>
                                        <Link href="#"
                                              className="landingViewButton"
                                              size="small">
                                            <FontAwesomeIcon icon={faPlus} style={{paddingRight: '5px'}}/>
                                            New Project
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#"
                                              className="landingViewButton"
                                              size="small"
                                             onClick={()=>{
                                                 this.workspaceRendererEvtHandler.openProject();
                                             }}>
                                            <FontAwesomeIcon icon={faFolderOpen} style={{paddingRight: '5px'}}/>
                                            Open Existing Project
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        );
    }
}