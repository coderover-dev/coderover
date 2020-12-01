import './App.css';
import React from "react";
import {ThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {StatusBar} from "./components/statusBar/StatusBar";
import {Alerts} from "./components/alert/Alerts";
import {ContentView} from "./views/ContentView";

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


function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <ContentView/>
            </div>
            <StatusBar/>
            <Alerts/>
        </ThemeProvider>
    )
}

export default App;
