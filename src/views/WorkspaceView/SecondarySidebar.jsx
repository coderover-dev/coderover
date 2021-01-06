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
import {Button, IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import {workspaceData} from "../../shared/workspace-data";
import {dataModelSubject, querySubject, secondarySidebarSubject, tabBarSubject} from "../../shared/workspace-events";
import {getRenderer} from "../../renderer/renderer";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export class SecondarySidebar extends React.Component {

  constructor(props) {
    super(props);
    this.renderer = getRenderer();

    this.state = {
      items: []
    }
  }

  prepareItemList(componentIdField, componentNameField) {
    let items = [];
    if(this.props.components===undefined||this.props.components==null){
      return items;
    }

    const idList = Object.keys(this.props.components);
    for (let i = 0; i < idList.length; i++) {
      items.push(this.prepareItemKeyValuePair(this.props.components[idList[i]], componentIdField, componentNameField));
    }

    return items;
  }

  prepareItemKeyValuePair(data, componentIdField, componentNameField) {
    return {
      key: data[componentIdField],
      value: data[componentNameField]
    }
  }

  handleItemSelection(itemType, itemId) {
    switch (itemType) {
      case "DATA_MODEL":
        this.renderer
          .getDataModelHandler()
          .fetchDataModel(workspaceData.project, itemId);
        break;
      case "QUERY":
        this.renderer
          .getDataModelHandler()
          .fetchDataModel(workspaceData.project, itemId);
        break;
      default:
        break;
    }
  }

  createItem(itemType, itemId, itemName, itemIdx) {
    return (
      <ListItem button style={{height: '32px'}}
                key={itemId}
                onClick={() => this.handleItemSelection(itemType, itemId)}
                className="sidebarSubMenuItem">
        <ListItemText>
          <span className="sidebarSubMenuItemText">{itemName}</span>
        </ListItemText>
      </ListItem>
    )
  }

  getItemList() {
    switch (this.props.componentType) {
      case "DATA_MODEL":
        this.state.items = this.prepareItemList('id', 'dataModelName');
        break;
      case "QUERY":
        this.state.items = this.prepareItemList('id', 'queryName');
        break;
      default:
        this.state.items = [];
        break;
    }

    return (
      <Grid container style={{
        flexDirection: "column",
        borderRight: '2px',
        paddingTop: '5px',
        borderRightColor: "#cecece"
      }}>
        <List component="nav">
          {
            this.state.items.map((item, index) => this.createItem(this.props.componentType, item.key, item.value, index))
          }
        </List>
      </Grid>
    )
  }

  handleAddNewComponent() {
    switch (this.props.componentType) {
      case "DATA_MODEL":
        dataModelSubject.next(null);
        break;
      case "QUERY":
        querySubject.next(null);
        break;
      default:
        break;
    }
  }

  getFilterBar() {
    return (
      <Grid container item
            style={{
              paddingLeft: 10,
              paddingRight: 5,
              paddingTop: 10,
              paddingBottom: 5,
              marginRight: 1,
              marginLeft: 1,
              borderBottom: '1px solid #cecece'
            }}
            spacing={1}>
        <Grid item>
          <OutlinedInput
            style={{width: '135px', height: '30px', fontSize: '8pt'}}
            id="dataModelName"
            value={this.state.searchField}
            onChange={(event) => {
              this.setState({
                searchField: event.target.value
              })
            }}
            placeholder="search"
            startAdornment={
              <FontAwesomeIcon color="#3b444b"
                               style={{fontSize: '12pt'}}
                               icon={faSearch}/>
            }
            margin="dense"/>
        </Grid>
        <Grid item>
          <Tooltip title="Add new component">
            <Button variant={"outlined"}
                    size={"small"}
                    color="primary"
                    style={{height: '30px', fontSize: '9pt'}}
                    onClick={() => this.handleAddNewComponent()}
                    startIcon={
                      <FontAwesomeIcon style={{fontSize: '12pt'}}
                                       icon={faPlusCircle}/>
                    }>Add</Button>
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