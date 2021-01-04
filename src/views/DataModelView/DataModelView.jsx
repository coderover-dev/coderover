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
import {DataModelFields} from "./DataModelFields";
import Button from "@material-ui/core/Button";
import {workspaceData} from "../../shared/workspace-data";
import {dataModelSubject} from "../../shared/workspace-events";
import {v4 as uuidv4} from "uuid";
import {DataModelRelations} from "./DataModelRelations";

export class DataModelView extends React.Component {

  constructor(props) {
    super(props);
    this.renderer = getRenderer();
    this.contentSubscription =
      props.content.subscribe(this.loadContent.bind(this));
    this.state = {
      dataModelName: props.dataModelName,
      dirty: false,
      transient: false,
      fields: {},
      relations: {}
    };
    this.reset();
  }

  componentWillUnmount() {
    console.log("data model view unmounted")
    this.contentSubscription.unsubscribe();
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    console.log("dirty :: " + this.state.dirty);
  }

  loadContent(metadata) {
    if (this.state !== undefined) {
      if (metadata != null && metadata.dataModelName === this.props.dataModelName) {
        metadata.dirty = false;
        this.setState(metadata);
      } else if (metadata == null && this.props.dataModelName === "") {
        this.reset();
      }
    }
  }

  handleAddField() {
    let fields = this.state.fields;
    let transient = this.transient;
    if (transient === undefined || transient == null) {
      transient = false;
    }

    let fieldId = uuidv4();
    fields[fieldId] = {
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
    this.setState({fields: fields, dirty: true});
  }

  handleFieldUpdate(updatedField) {
    let fields = this.state.fields;
    let fieldId = updatedField.fieldId;
    fields[fieldId] = updatedField;
    fields[fieldId].newField = false;
    this.setState({fields: fields, dirty: true});
  }

  handleFieldDelete(fieldId) {
    let fields = this.state.fields;
    fields[fieldId] = this.state[fieldId];
    fields[fieldId].deleted = true;
    this.fieldCount = this.fieldCount - 1;
    this.setState({fields: fields, dirty: true});
  }

  handleAddRelation() {
    let relations = this.state.relations;
    let fieldId = uuidv4();
    relations[fieldId] = {
      newField: true,
      editMode: true,
      fieldId: fieldId,
      fieldName: "",
      refDataModelName: "",
      refFieldName: "",
      deleteAction: "",
      updateAction: "",
      deleted: false
    };
    this.fieldCount = this.fieldCount + 1;
    this.setState({relations: relations, dirty: true});
  }

  handleRelationUpdate(updatedRelation) {
    let relations = this.state.relations;
    let fieldId = updatedRelation.fieldId;
    relations[fieldId] = updatedRelation;
    relations[fieldId].newField = false;
    this.setState({relations: relations, dirty: true});
  }

  handleRelationDelete(fieldId) {
    let relations = this.state.relations;
    relations[fieldId] = this.state[fieldId];
    relations[fieldId].deleted = true;
    this.fieldCount = this.fieldCount - 1;
    this.setState({relations: relations, dirty: true});
  }

  isDirty() {

  }

  reset() {
    let state = {
      dirty: false,
      dataModelName: "",
      dbTableName: "",
      transient: false,
      fields: {},
      relations: {},
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
    let handleAddField = this.handleAddField.bind(this);
    let handleFieldUpdate = this.handleFieldUpdate.bind(this);
    let handleFieldDelete = this.handleFieldDelete.bind(this);

    let handleAddRelation = this.handleAddRelation.bind(this);
    let handleRelationUpdate = this.handleRelationUpdate.bind(this);
    let handleRelationDelete = this.handleRelationDelete.bind(this);

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
                  dbTableName: camelCaseToSnakeCase(event.target.value),
                  dirty: true
                })
              }}
              margin="dense"/>
          </Grid>
          <Grid item style={{textAlign: "left"}}>
            <Checkbox
              color="primary"
              checked={this.state.transient}
              onChange={(event, checked) => {
                this.setState({transient: checked, dirty: true});
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
                this.setState({dbTableName: event.target.value, dirty: true});
              }}
              disabled={this.state.transient}
              margin="dense"/>
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: '5px', paddingBottom: '5px'}}>
          <Divider/>
        </Grid>
        <Grid item xs={12}>
          <DataModelFields fields={this.state.fields}
                           transient={this.state.transient}
                           onAdd={handleAddField}
                           onUpdate={handleFieldUpdate}
                           onDelete={handleFieldDelete}/>
        </Grid>
        <Grid item xs={12}>
          <DataModelRelations dataModelName={this.state.dataModelName}
                              relations={this.state.relations}
                              onAdd={handleAddRelation}
                              onUpdate={handleRelationUpdate}
                              onDelete={handleRelationDelete}/>
        </Grid>
      </Grid>
    )
  }

  render() {
    return (
      <Grid container direction="column" style={{padding: '15px', minWidth: '850px', maxWidth: '100%'}}>
        <Grid item container direction="row">
          <Grid item xs={7}>
            <Typography variant="h6" style={{fontWeight: 'bold'}}>
              Data Model : <span style={{fontWeight: "bolder", color: "#1569C7"}}>{this.state.dataModelName}</span>
            </Typography>
          </Grid>
          <Grid item xs={5} container direction={"row"}
                justify={"flex-end"}>
            <Grid item style={{paddingRight: 10}}>
              <Button
                variant={"contained"}
                size={"small"}
                style={{height: '24px'}}
                color="primary"
                disabled={!this.state.dirty}
                onClick={() => {
                  let projectMetadata = workspaceData.project;
                  this.renderer
                    .getDataModelHandler()
                    .persistDataModel(projectMetadata, this.state);
                  this.setState({dirty: false});
                }}
                startIcon={
                  <FontAwesomeIcon style={{fontSize: '15pt'}}
                                   icon={faSave}/>
                }>Save</Button>
            </Grid>
            <Grid item>
              <Button variant={"outlined"}
                      size={"small"}
                      color="primary"
                      onClick={() => {
                        this.props.onClose();
                      }}
                      startIcon={
                        <FontAwesomeIcon style={{fontSize: '15pt'}}
                                         icon={faTimesCircle}/>
                      }>Close</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{paddingTop: '5px', paddingBottom: '5px'}}>
          <Divider/>
        </Grid>
        <Grid item style={{paddingTop: 10}}>
          {this.getForm()}
        </Grid>
      </Grid>
    )
  }
}