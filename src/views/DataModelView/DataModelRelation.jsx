import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit, faPlusCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";


export class DataModelRelation extends React.Component {

  constructor(props) {
    super(props);
    this.deleteActions = [
      {label: "NO ACTION", key: "NO_ACTION"},
      {label: "CASCADE", key: "CASCADE"}
    ];
    this.updateActions = [
      {label: "NO ACTION", key: "NO_ACTION"},
      {label: "CASCADE", key: "CASCADE"}
    ];
  }

  setFieldValue(fieldId, fieldAttribute, fieldValue) {
    let relation = this.props.relation;
    relation[fieldAttribute] = fieldValue;
    this.props.onUpdate(relation);
  }

  allowSave() {
    return this.props.relation.fieldName.trim() !== "" &&
      this.props.relation.refDataModelName.trim() !== "";
  }

  getActionLabel(actions, selectedActionKey) {
    const selectedAction =
      actions.filter(action => action.key === selectedActionKey);
    if (selectedAction != null && selectedAction.length > 0) {
      return selectedAction[0].label;
    }
    return "";
  }

  getDataModelNames() {
    let dataModelNames = Object.keys(this.props.dataModelFieldMap);
    return dataModelNames.filter(dataModelName =>
      dataModelName.toLowerCase() !== this.props.dataModelName.toLowerCase());
  }

  getDataModelFieldNames(dataModelName) {
    if (dataModelName === undefined || dataModelName == null || dataModelName === "") {
      return [];
    }

    let fields = [];
    let fieldIds = this.props.dataModelFieldMap[dataModelName]
    for (let i = 0; i < fieldIds.length; i++) {
      fields.push(fieldIds[i]);
    }
    return fields;
  }

  readonlyView() {
    return (
      <Grid container direction="row" style={{height: '35px', width: '100%'}}
            key={'field_' + this.props.relation.fieldId}>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px', minWidth: '150px'}}>
          <Typography variant={"body1"}
                      style={{fontWeight: 'bolder'}}>{this.props.relation.fieldName}</Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '4px'}}>
          <span style={{fontWeight: "bolder", fontStyle: "italic", fontSize: '10pt'}}>
            {this.props.relation.refDataModelName}
            <span style={{fontWeight: "normal"}}>({this.props.relation.refFieldName})</span>
          </span>
        </Grid>
        <Grid item style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '5px'}}>
          <span style={{fontSize: '8pt'}}>
            <b>On Delete</b> {this.getActionLabel(this.deleteActions, this.props.relation.deleteAction)}
          </span>
        </Grid>
        <Grid item style={{paddingLeft: '20px', paddingRight: '20px', paddingTop: '5px'}}>
          <span style={{fontSize: '8pt'}}>
            <b>On Update</b> {this.getActionLabel(this.updateActions, this.props.relation.updateAction)}
          </span>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '4px'}}>
          <Tooltip title="Edit">
            <IconButton style={{fontSize: '14pt', height: '10px'}}
                        color="primary"
                        onClick={() => {
                          this.setFieldValue(this.props.relation.fieldId, 'editMode', true);
                        }}>
              <FontAwesomeIcon icon={faEdit} style={{fontSize: '10pt'}}/><span
              style={{fontSize: '10pt'}}>&nbsp;Edit</span>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton style={{fontSize: '14pt', height: '10px'}}
                        color="primary"
                        onClick={() => {
                          this.setFieldValue(this.props.relation.fieldId, 'deleted', true);
                        }}>
              <FontAwesomeIcon icon={faPlusCircle} style={{fontSize: '10pt'}}/><span
              style={{fontSize: '10pt'}}>&nbsp;Delete</span>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    )
  }

  editView() {
    return (
      <Grid container direction="row" style={{
        border: '1px solid #cecece',
        backgroundColor: '#f9f9f9',
        padding: '5px',
        marginTop: 10,
        borderRadius: '10px'
      }}
            key={'field_' + this.props.relation.fieldId}>
        <Grid item container direction={"row"} spacing={2}>

          <Grid item style={{width: '150px'}}>
            <Grid item style={{paddingTop: '2px'}}>
              <Typography variant={"caption"}>Field Name</Typography>
            </Grid>
            <Grid item>
              <OutlinedInput fullWidth
                             id={'foreignKey_' + this.props.relation.fieldId}
                             value={this.props.relation.fieldName}
                             onChange={(event) => {
                               this.setFieldValue(
                                 this.props.relation.fieldId, 'fieldName',
                                 event.target.value.replace(/[^\w\s]/gi, ""));
                             }}
                             margin="dense"/>
            </Grid>
          </Grid>

          <Grid item style={{width: '150px'}}>
            <Grid item style={{paddingTop: '2px'}}>
              <Typography variant={"caption"}>Ref. Data Model</Typography>
            </Grid>
            <Grid item>
              <TextField select id={'refDataModelName_' + this.props.relation.fieldId} size="small"
                         defaultValue="" variant="outlined" fullWidth
                         value={this.props.relation.refDataModelName}
                         onChange={(event) => {
                           this.setFieldValue(this.props.relation.fieldId, 'refDataModelName', event.target.value);
                         }}>
                {this.getDataModelNames().map((dataModelName) => (
                  <MenuItem key={dataModelName} value={dataModelName}>
                    {dataModelName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item style={{width: '150px'}}>
            <Grid item style={{paddingTop: '2px'}}>
              <Typography variant={"caption"}>Ref. Field Name</Typography>
            </Grid>
            <Grid item>
              <TextField select id={'refFieldName_' + this.props.relation.fieldId} size="small"
                         defaultValue="" variant="outlined" fullWidth
                         value={this.props.relation.refFieldName}
                         onChange={(event) => {
                           this.setFieldValue(this.props.relation.fieldId, 'refFieldName', event.target.value);
                         }}>
                {this.getDataModelFieldNames(this.props.relation.refDataModelName).map((dataModelName) => (
                  <MenuItem key={dataModelName} value={dataModelName}>
                    {dataModelName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item style={{width: '150px'}}>
            <Grid item>
              <Typography variant={"caption"}>On Delete</Typography>
            </Grid>
            <Grid item style={{paddingTop: '2px'}}>
              <TextField select id={'deleteAction_' + this.props.relation.fieldId} size="small"
                         defaultValue="" variant="outlined" fullWidth
                         value={this.props.relation.deleteAction}
                         onChange={(event) => {
                           this.setFieldValue(this.props.relation.fieldId, 'deleteAction', event.target.value);
                         }}>
                {this.deleteActions.map((deleteAction) => (
                  <MenuItem key={deleteAction.key} value={deleteAction.key}>
                    {deleteAction.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item style={{width: '150px'}}>
            <Grid item>
              <Typography variant={"caption"}>On Update</Typography>
            </Grid>
            <Grid item style={{paddingTop: '2px'}}>
              <TextField select id={'updateAction_' + this.props.relation.fieldId} size="small"
                         defaultValue="" variant="outlined" fullWidth
                         value={this.props.relation.updateAction}
                         onChange={(event) => {
                           this.setFieldValue(this.props.relation.fieldId, 'updateAction', event.target.value);
                         }}>
                {this.updateActions.map((updateAction) => (
                  <MenuItem key={updateAction.key} value={updateAction.key}>
                    {updateAction.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item style={{paddingTop: '20px', paddingLeft: '10px'}}>
            <Tooltip title="Apply">
              <IconButton
                size="small"
                color="primary"
                disabled={!this.allowSave()}
                onClick={() => {
                  this.props.relation.editMode = false;
                  this.props.onUpdate(this.props.relation);
                }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{fontSize: '12pt'}}/><span
                style={{fontSize: '12pt'}}>&nbsp;Save</span>
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item style={{paddingTop: '20px'}}>
            <Tooltip title="Cancel">
              <IconButton
                size="small"
                color="primary"
                onClick={() => {
                  if (this.props.relation.newField) {
                    this.setFieldValue(this.props.relation.fieldId, 'deleted', true);
                  }
                  this.setFieldValue(this.props.relation.fieldId, 'editMode', false);
                }}>
                <FontAwesomeIcon icon={faTimesCircle} style={{fontSize: '12pt'}}/><span
                style={{fontSize: '12pt'}}>&nbsp;Discard</span>
              </IconButton>
            </Tooltip>
          </Grid>

        </Grid>
      </Grid>
    )
  }

  render() {
    return this.props.relation.editMode ? this.editView() : this.readonlyView();
  }
}