import React from "react";
import {WorkspaceView} from "./WorkspaceView/WorkspaceView";
import {LandingView} from "./LandingView/LandingView";
import {workspaceSubject} from "../shared/workspace-events";
import {workspaceData} from "../shared/workspace-data";

export class ContentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            init: false
        }
        this.workspaceUpdateSubscription =
            workspaceSubject.subscribe(value => {
                this.setState({init: workspaceData.init});
            });
    }

    componentWillUnmount() {
        this.workspaceUpdateSubscription.unsubscribe();
    }

    render() {
        return this.state.init ? (<WorkspaceView/>) : (<LandingView/>);
    }
}