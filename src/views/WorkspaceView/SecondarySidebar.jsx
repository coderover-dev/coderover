import * as React from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import {
  faPlusCircle,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
import ListItem from "@material-ui/core/ListItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ListItemText from "@material-ui/core/ListItemText";
import {IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";

export class SecondarySidebar extends React.Component {

  createSidebarItem(text) {
    return (
      <ListItem button style={{height: '32px'}} className="sidebarSubMenuItem">
        <ListItemText>
          <span className="sidebarSubMenuItemText">{text}</span>
        </ListItemText>
      </ListItem>
    )
  }

  getItemList() {
    return (
      <Grid container style={{
        flexDirection: "column",
        borderRight: '2px',
        borderRightColor: "#cecece"
      }}>
        <List component="nav">

        </List>
      </Grid>
    )
  }

  getFilterBar() {
    return (
      <Grid container item style={{padding: 5, borderBottom: '1px solid #cecece'}}>
        <Grid item xs={10} style={{paddingRight: '10px'}}>
          <TextField
            size="small"
            id="outlined-full-width"
            style={{margin: 8}}
            placeholder="Filter"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faSearch}/>
                </InputAdornment>
              )
            }}
            variant="outlined"/>
        </Grid>
        <Grid item xs={2} style={{paddingLeft: '10px', marginTop: '10px'}}>
          <Tooltip title="Add new component">
            <IconButton color="primary"
                        style={{fontWeight: 'bold', fontSize: '14pt', padding: 0}}
                        onClick={() => {
                        }}>
              <FontAwesomeIcon className="iconButton" color="primary"
                               icon={faPlusCircle}/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <Grid container
            style={{
              height: 'calc(100vh - 68px)',
              width: '240px',
              alignContent: "flex-start",
              backgroundColor: "#ffffff",
              borderRight: "1px solid #cecece"
            }}>
        {this.getFilterBar()}
        {this.getItemList()}
      </Grid>
    )
  }
}