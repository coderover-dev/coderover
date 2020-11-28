import './App.css';
import React from "react";
import {Container} from "./components/container/Container";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {LandingView} from "./views/LandingView/LandingView";

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

const getProjectHomeView = function(){
    return (
        <Container/>
    )
}

const getLandingView = function (){
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
      </ThemeProvider>
  )
}

export default App;
