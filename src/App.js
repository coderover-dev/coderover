import './App.css';
import React from "react";
import {Container} from "./components/container/Container";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {LandingView} from "./views/LandingView/LandingView";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Progress} from "./components/progress/Progress";
import {Grid} from "@material-ui/core";
import {Alerts} from "./components/alert/Alerts";

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
        <Container/>
    )
}

const getLandingView = function () {
    return (
        <LandingView/>
    )
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {getLandingView()}
            </div>
            <Progress/>
            <Alerts/>
        </ThemeProvider>
    )
}

export default App;
