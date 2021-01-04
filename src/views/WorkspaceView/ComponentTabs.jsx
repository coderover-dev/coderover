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
    minHeight: '45px'
  },
  indicator: {
    borderTop: '1px solid rgb(206, 206, 206)'
  },
})(Tabs);

export const ComponentTab =
  withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: '120px',
      maxWidth: '120px',
      height: '45px',
      fontWeight: theme.typography.fontWeightRegular,
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
        // color: '#40a9ff',
      },
      '&:focus': {
        // color: '#40a9ff'
      },
    },
    selected: {},
  }))((props) =>
    <Tab disableRipple {...props}
         className={getTabClassName(props.data.tabId, props.selectedTab)}
         onClick={() => props.onTabSelection(props.data)}
         label={
           <React.Fragment>
             <Grid container direction={"row"} justify={"space-evenly"}
                   style={{textAlign: "left", lineHeight: 1.2}}>
               <Grid item container direction={"column"} xs={10}>
                 <Grid item style={{
                   fontSize: '9pt',
                   fontWeight: 'bolder',
                   color: 'var(--fg-primary--shade--one)'
                 }}>{props.data.componentName}</Grid>
                 <Grid item style={{
                   fontSize: '7pt'
                 }}>{getTabTypeLabel(props.data.componentType)}</Grid>
               </Grid>
               <Grid item direction={"column"} xs={2}>
                 <Tooltip title="Close">
                   <IconButton
                     size="small"
                     color="primary"
                     onClick={() => {
                       if (props.onClose !== undefined && props.onClose != null) {
                         props.onClose(props.data);
                       }
                     }}>
                     <FontAwesomeIcon icon={faTimesCircle} style={{fontSize: '10pt'}}/>
                   </IconButton>
                 </Tooltip>
               </Grid>
             </Grid>
           </React.Fragment>
         }/>
  );

function getTabTypeLabel(tabType) {
  switch (tabType.toUpperCase()) {
    case "DATA_MODELS":
      return "Data Models";
    default:
      return "";
  }
}

function getTabClassName(currentTab, selectedTab) {
  return selectedTab === currentTab ? 'SelectedTab' : '';
}