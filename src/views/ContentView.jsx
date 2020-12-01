import React from "react";
import {Workspace} from "../components/workspace/Workspace";
import {LandingView} from "./LandingView/LandingView";
import {onWorkspaceUpdate} from "../components/workspace/workspace-events";
import {workspaceMetadata} from "../data/workspace-metadata";

export class ContentView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            init: false
        }
        this.workspaceUpdateSubscription =
            onWorkspaceUpdate.subscribe(value => {
                this.setState({init: workspaceMetadata.init});
            });
    }

    componentWillUnmount() {
        this.workspaceUpdateSubscription.unsubscribe();
    }

    render() {
        return this.state.init ? (<Workspace/>) : (<LandingView/>);
    }
}