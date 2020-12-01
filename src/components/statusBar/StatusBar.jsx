import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {Subject} from 'rxjs'

const statusBar = new Subject();

export function showProgress(message) {
    statusBar.next({
        visible: true,
        message: message
    })
}

export function hideProgress() {
    statusBar.next({
        visible: false,
        message: ""
    })
}

export class StatusBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            message: ""
        }

        let handleProgressStateChange = this.handleProgressStateChange.bind(this);
        statusBar.subscribe(handleProgressStateChange);
    }

    componentWillUnmount() {
        statusBar.unsubscribe();
    }

    handleProgressStateChange(state) {
        this.setState(state);
    }

    getMessage() {
        if (this.state.message !== undefined && this.state.message != null) {
            return this.state.message;
        } else {
            return "";
        }
    }

    render() {
        if (this.state.visible) {
            return (
                <Grid container style={{
                    zIndex: 9999,
                    height: '35px',
                    padding: '5px',
                    position: "fixed",
                    top: 'calc(100vh - 35px)',
                    backgroundColor: "white"
                }}>
                    <Grid item style={{width: '25px'}}>
                        <CircularProgress variant={"indeterminate"} style={{height: '20px', width: '20px'}}/>
                    </Grid>
                    <Grid item style={{width: 'calc(100% - 30px)', padding: '3px'}}>
                        <Typography variant={"body1"} style={{
                            color: "#1569C7",
                            fontWeight: "bold",
                            fontSize: '9pt'
                        }}>{this.getMessage()}</Typography>
                    </Grid>
                </Grid>
            )
        } else {
            return (<div/>)
        }
    }

}