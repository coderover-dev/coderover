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
import {workspaceData} from "../../shared/workspace-data";
import {secondarySidebarSubject} from "../../shared/workspace-events";

export class SecondarySidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    }

    this.secondarySidebarSubscription =
      secondarySidebarSubject.subscribe(this.handleSidebarRefresh.bind(this));
  }

  componentWillUnmount() {
    this.secondarySidebarSubscription.unsubscribe();
  }

  handleSidebarRefresh(items){
    this.setState({
      items: items
    })
  }

  createSidebarItem(text) {
    return (
      <ListItem button style={{height: '32px'}}
                key={text}
                className="sidebarSubMenuItem">
        <ListItemText>
          <span className="sidebarSubMenuItemText">{text}</span>
        </ListItemText>
      </ListItem>
    )
  }

  getItemList() {
    switch (workspaceData.selectedComponent.key) {
      case "DATA_MODELS":
        this.items = workspaceData.dataModels;
        break;
      default:
        break;
    }

    return (
      <Grid container style={{
        flexDirection: "column",
        borderRight: '2px',
        borderRightColor: "#cecece"
      }}>
        <List component="nav">
          {
            this.state.items.map((item) => this.createSidebarItem(item))
          }
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