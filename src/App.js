import './App.css';
import React from "react";
import {Workspace} from "./components/workspace/Workspace";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {LandingView} from "./views/LandingView/LandingView";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Progress} from "./components/progress/Progress";
import {Grid} from "@material-ui/core";
import {Alerts} from "./components/alert/Alerts";
import {workspaceMetadata, onWorkspaceUpdate} from "./data/workspaceMetadata";

const theme = createMuiTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(','),
    },
    palette: {
        primary: {
            main: '#1569C7',
        },
        secondary: {
            main: '#c77415',
        },
    }
});

const getProjectHomeView = function () {
    return (
        <Workspace/>
    )
}

const getLandingView = function () {
    return (
        <LandingView/>
    )
}


function App() {
    const [init, setInit] = React.useState(false);

    const getContentView = function () {
        onWorkspaceUpdate.subscribe(value => {
            setInit(workspaceMetadata.init);
        });

        if (init) {
            return getProjectHomeView();
        } else {
            return getLandingView();
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {getContentView()}
            </div>
            <Progress/>
            <Alerts/>
        </ThemeProvider>
    )
}

export default App;
