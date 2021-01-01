import * as React from "react";
import Grid from "@material-ui/core/Grid";
import './DataModelView.css'

import {getRenderer} from "../../renderer/renderer";
import {Divider, Typography} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import {camelCaseToSnakeCase} from "../../shared/string-utils";
import {DataModelFieldList} from "./DataModelFieldList";
import Button from "@material-ui/core/Button";
import {workspaceData} from "../../shared/workspace-data";
import {dataModelSubject} from "../../shared/workspace-events";
import {v4 as uuidv4} from "uuid";

export class DataModelView extends React.Component {

  constructor(props) {
    super(props);
    this.renderer = getRenderer();
    this.dataModelSubscription =
      dataModelSubject.subscribe(this.loadDataModel.bind(this));
    this.state = {
      transient: false,
      fields: {}
    };
    this.reset();
  }

  componentWillUnmount() {
    this.dataModelSubscription.unsubscribe();
  }

  loadDataModel(metadata) {
    if (this.state !== undefined) {
      this.setState(metadata);
    }
  }

  handleAddField() {
    let state = this.state.fields;
    let transient = this.transient;
    if (transient === undefined || transient == null) {
      transient = false;
    }

    let fieldId = uuidv4();
    state[fieldId] = {
      newField: true,
      editMode: true,
      fieldId: fieldId,
      fieldName: "",
      fieldDataType: "",
      dbColumnName: "",
      defaultValue: "",
      transient: transient,
      nullable: true,
      unique: false,
      refDataModelName: "",
      refFieldName: "",
      refKeyName: "",
      deleted: false
    };
    this.fieldCount = this.fieldCount + 1;
    this.setState(state);
  }

  handleFieldUpdate(updatedField) {
    let state = this.state.fields;
    let fieldId = updatedField.fieldId;
    state[fieldId] = updatedField;
    state[fieldId].newField = false;
    this.setState(state);
  }

  handleFieldDelete(fieldId) {
    let state = this.state.fields;
    state[fieldId] = this.state[fieldId];
    state[fieldId].deleted = true;
    this.fieldCount = this.fieldCount - 1;
    this.setState(state);
  }

  reset() {
    let state = {
      dataModelName: "",
      dbTableName: "",
      transient: false,
      fields: {},
      resourceName: "",
      searchField: ""
    };

    if (this.state == null) {
      this.state = state;
    } else {
      this.setState(state)
    }
  }

  getForm() {
    let handleAdd = this.handleAddField.bind(this);
    let handleUpdate = this.handleFieldUpdate.bind(this);
    let handleDelete = this.handleFieldDelete.bind(this);

    return (
      <Grid container direction={"column"} spacing={2}>
        <Grid item container direction="row" style={{paddingTop: "10px"}} xs={12} spacing={2}>
          <Grid item style={{textAlign: "left"}}>
            <Typography variant={"caption"}>Name</Typography>
          </Grid>
          <Grid item style={{textAlign: "left"}}>
            <OutlinedInput
              id="dataModelName"
              value={this.state.dataModelName}
              onChange={(event) => {
                this.setState({
                  dataModelName: event.target.value,
                  dbTableName: camelCaseToSnakeCase(event.target.value)
                })
              }}
              margin="dense"/>
          </Grid>
          <Grid item style={{textAlign: "left"}}>
            <Checkbox
              color="primary"
              checked={this.state.transient}
              onChange={(event, checked) => {
                this.setState({transient: checked});
              }}
              inputProps={{'aria-label': 'secondary checkbox'}}/>
            <Typography variant={"caption"}>Data transfer only &nbsp;&nbsp;</Typography>
          </Grid>
          <Grid item style={{textAlign: "left"}}>
            <Typography variant={"caption"}>Table name</Typography>
          </Grid>
          <Grid item>
            <OutlinedInput
              id="dbTableName"
              value={this.state.dbTableName}
              onChange={(event) => {
                this.setState({dbTableName: event.target.value});
              }}
              disabled={this.state.transient}
              margin="dense"/>
          </Grid>
        </Grid>
        <Grid item>
          <Divider/>
        </Grid>
        <Grid item xs={12}>
          <DataModelFieldList fields={this.state.fields}
                              transient={this.state.transient}
                              onAdd={handleAdd}
                              onUpdate={handleUpdate}
                              onDelete={handleDelete}/>
        </Grid>
      </Grid>
    )
  }

  getActionButtons() {
    return (<div/>)
  }

  render() {
    return (
      <Grid container direction="column" style={{padding: '15px', minWidth: '850px', maxWidth: '100%'}}>
        <Grid item container direction="row">
          <Grid item xs={7}>
            <Typography variant="h6" style={{fontWeight: 'bold'}}>
              Create data model
            </Typography>
          </Grid>
          <Grid item xs={5} container direction={"row"}
                justify={"flex-end"}>
            <Grid item style={{paddingRight: 10}}>
              <Tooltip title="Apply">
                <Button
                  variant={"contained"}
                  size={"small"}
                  color="primary"
                  onClick={() => {
                    let projectMetadata = workspaceData.project;
                    this.renderer
                      .getDataModelHandler()
                      .persistDataModel(projectMetadata, this.state);
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
        <Grid item style={{paddingTop: 10}}>
          {this.getForm()}
        </Grid>
        <Grid item>
          {this.getActionButtons()}
        </Grid>
      </Grid>
    )
  }
}