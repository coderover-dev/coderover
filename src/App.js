import './App.css';
import React from "react";
import {Container} from "./shared/container/Container";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {LandingView} from "./views/LandingView/LandingView";

const theme = createMuiTheme({
    typography: {
        fontFamily: ["Montserrat", "sans-serif"].join(','),
    },});

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
