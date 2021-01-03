import Tabs from "@material-ui/core/Tabs";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";

export const ComponentTabs = withStyles({
  root: {
    height: '45px',
    minHeight: '45px',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

export const ComponentTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: '120px',
    maxWidth: '120px',
    height: '45px',
    fontWeight: theme.typography.fontWeightBold,
    border: '1px solid rgb(206, 206, 206)',
    marginLeft: 1,
    marginRight: 1,
    backgroundColor: 'white',
    fontSize: '7pt',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: 'white'
    },
    '&:focus': {
      color: '#40a9ff'
    },
  },
  selected: {},
}))((props) =>
  <Tab disableRipple {...props}
       label={
         <React.Fragment>
           <Grid container direction={"row"} justify={"space-evenly"}
                 style={{textAlign: "left", lineHeight: 1.2}}>
             <Grid item container direction={"column"} xs={10}>
               <Grid item style={{
                 fontSize: '8pt',
                 fontWeight: 'bolder',
                 color: 'var(--fg-primary--shade--one)'
               }}>{props.componentName}</Grid>
               <Grid item style={{
                 fontSize: '7pt',
                 fontWeight: "lighter",
                 fontStyle: "italic"
               }}>{props.componentType}</Grid>
             </Grid>
             <Grid item direction={"column"} xs={2}>
               <Tooltip title="Close">
                 <IconButton
                   size="small"
                   color="primary"
                   onClick={() => {
                   }}>
                   <FontAwesomeIcon icon={faTimesCircle} style={{fontSize: '10pt'}}/>
                 </IconButton>
               </Tooltip>
             </Grid>
           </Grid>
         </React.Fragment>
       }/>
);