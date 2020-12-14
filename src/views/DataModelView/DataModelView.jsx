import * as React from "react";
import Grid from "@material-ui/core/Grid";
import './DataModelView.css'

import {getRenderer} from "../../renderer/renderer";
import {Divider, Typography} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faFolderOpen,
  faPlusCircle,
  faSave,
  faSearch,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import {camelCaseToSnakeCase} from "../../shared/string-utils";
import {DataModelField} from "./DataModelField";
import {v4 as uuidv4} from 'uuid';
import {DataModelFieldList} from "./DataModelFieldList";
import Button from "@material-ui/core/Button";

export class DataModelView extends React.Component {

  constructor(props) {
    super(props);
    this.renderer = getRenderer();
    this.state = {
      dataModelName: "",
      tableName: "",
      transient: false,
      fields: [],
      searchField: ""
    }
  }

  getForm() {
    return (
        <Grid container direction={"column"}>
          <Grid item container direction="row" style={{paddingTop: "10px"}} xs={12}>
            <Grid item style={{textAlign: "left"}} xs={2}>
              <Typography variant={"caption"}>Name</Typography>
            </Grid>
            <Grid item style={{textAlign: "left"}}>
              <OutlinedInput
                  id="dataModelName"
                  value={this.state.dataModelName}
                  onChange={(event) => {
                    this.setState({
                      dataModelName: event.target.value,
                      tableName: camelCaseToSnakeCase(event.target.value)
                    })
                  }}
                  margin="dense"/>
              <Typography variant={"caption"} style={{paddingLeft: '20px'}}>Data transfer only &nbsp;&nbsp;</Typography>
              <Checkbox
                  color="primary"
                  checked={this.state.transient}
                  onChange={(event, checked) => {
                    this.setState({transient: checked});
                  }}
                  inputProps={{'aria-label': 'secondary checkbox'}}/>
            </Grid>
          </Grid>
          <Grid item container direction="row" style={{paddingTop: "10px"}} xs={12}>
            <Grid item style={{textAlign: "left"}} xs={2}>
              <Typography variant={"caption"}>Table name</Typography>
            </Grid>
            <Grid item>
              <OutlinedInput
                  id="tableName"
                  value={this.state.tableName}
                  onChange={(event) => {
                    this.setState({tableName: event.target.value});
                  }}
                  disabled={this.state.transient}
                  margin="dense"/>
            </Grid>
          </Grid>
          <Grid item direction="column" xs={12}>
            <DataModelFieldList fields={this.state.fields} transient={this.state.transient}/>
          </Grid>
        </Grid>
    )
  }

  getActionButtons() {
    return (<div/>)
  }

  render() {
    return (
        <Grid container direction="column" style={{padding: '15px'}}>
          <Grid item container direction="row">
            <Grid item direction={"row"} xs="9">
              <Typography variant="h6" style={{fontWeight: 'bold'}}>
                Create data model
              </Typography>
            </Grid>
            <Grid item container direction={"row"}
                  xs="3" justify={"flex-end"}>
              <Grid item style={{paddingRight: 10}}>
                <Tooltip title="Apply">
                  <Button
                      variant={"contained"}
                      size={"small"}
                      color="primary"
                      onClick={() => {
                      }}
                      startIcon={
                        <FontAwesomeIcon style={{fontSize: '15pt'}}
                                         icon={faSave}/>
                      }>Save</Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Cancel">
                  <Button variant={"outlined"}
                          size={"small"}
                          color="primary"
                          onClick={() => {
                          }}
                          startIcon={
                            <FontAwesomeIcon style={{fontSize: '15pt'}}
                                             icon={faTimesCircle}/>
                          }>Cancel</Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{paddingTop: '5px', paddingBottom: '5px'}}>
            <Divider/>
          </Grid>
          <Grid item>
            {this.getForm()}
          </Grid>
          <Grid item>
            {this.getActionButtons()}
          </Grid>
        </Grid>
    )
  }
}