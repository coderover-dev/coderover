import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Divider, Typography} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faEdit, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {camelCaseToSnakeCase} from "../../shared/string-utils";
import Button from "@material-ui/core/Button";

export class DataModelField extends React.Component {

  dataTypes = [
    {label: "", value: ""},
    {label: 'ID', value: 'ID'},
    {label: 'Int', value: 'INT'},
    {label: 'Float', value: 'FLOAT'},
    {label: 'String', value: 'STRING'},
    {label: 'Boolean', value: 'BOOLEAN'},
    {label: 'Date', value: 'DATE'},
    {label: 'Timestamp', value: 'TIMESTAMP'},
    {label: 'Password', value: 'PASSWORD'},
    {label: 'Email Address', value: 'EMAIL'},
    {label: 'Foreign Key', value: 'FOREIGN_KEY'}
  ]

  constructor(props) {
    super(props);
    this.state = {
      field: {
        ...props.field
      }
    }
  }

  setFieldValue(fieldId, fieldAttribute, fieldValue) {
    let field = this.state.field;
    field[fieldAttribute] = fieldValue;
    this.setState({field: field})
  }

  allowSave() {
    if (this.state.field.fieldName.trim() !== "" &&
      this.state.field.fieldDataType.trim() !== "") {
      if (!this.state.field.transient && this.state.field.dbColumnName.trim() !== "") {
        return true;
      } else {
        return this.state.field.transient;
      }
    }

    return false;
  }

  readonlyView() {
    return (
      <Grid container direction="row" style={{height: '35px', width: '100%'}}
            key={'field_' + this.state.field.fieldId}>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px', minWidth: '150px'}}>
          <Typography variant={"body1"}
                      style={{fontWeight: 'bolder'}}>{this.state.field.fieldName}</Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '4px'}}>
          <Typography variant={"body2"} style={{
            fontWeight: "bolder",
            fontStyle: "italic",
            color: "gray"
          }}>{this.state.field.fieldDataType}</Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px'}}>
          <Typography
            variant={"body2"}>
            {(this.state.field.transient != null && this.state.field.transient) ? 'transient' : ''}
          </Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px'}}>
          <Typography
            variant={"body2"}>
            {(this.state.field.nullable != null && this.state.field.nullable) ? 'nullable' : ''}
          </Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px'}}>
          <Typography
            variant={"body2"}>
            {(this.state.field.unique != null && this.state.field.unique) ? 'unique' : ''}</Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '4px'}}>
          <Tooltip title="Edit">
            <IconButton style={{fontSize: '14pt', height: '10px'}}
                        color="primary"
                        onClick={() => {
                          this.setFieldValue(this.state.field.fieldId, 'editMode', true);
                        }}>
              <FontAwesomeIcon icon={faEdit} style={{fontSize: '10pt'}}/><span
              style={{fontSize: '10pt'}}>&nbsp;Edit</span>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton style={{fontSize: '14pt', height: '10px'}}
                        color="primary"
                        onClick={() => {
                          this.setFieldValue(this.state.field.fieldId, 'deleted', true);
                          this.props.onUpdate(this.state.field);
                        }}>
              <FontAwesomeIcon icon={faTimesCircle} style={{fontSize: '10pt'}}/><span
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
            key={'field_' + this.state.field.fieldId}>
        <Grid item container direction={"row"} spacing={2}>

          <Grid item style={{width: '150px'}}>
            <Grid item style={{paddingTop: '2px'}}>
              <Typography variant={"caption"}>Field Name</Typography>
            </Grid>
            <Grid item>
              <OutlinedInput fullWidth
                             id={'fieldName_' + this.state.field.fieldId}
                             value={this.state.field.fieldName}
                             onChange={(event) => {
                               let dbColumnName = this.state.field.dbColumnName;
                               let fieldName = event.target.value.replace(/[^\w\s]/gi, "");
                               //let newField = this.state.field.newField;
                               let transient = this.state.field.transient;
                               if (!transient) {
                                 dbColumnName = camelCaseToSnakeCase(fieldName, dbColumnName);
                                 this.setFieldValue(this.state.field.fieldId, 'dbColumnName', dbColumnName);
                               }
                               this.setFieldValue(this.state.field.fieldId, 'fieldName', fieldName);
                             }}
                             margin="dense"/>
            </Grid>
          </Grid>

          <Grid item style={{width: '150px'}}>
            <Grid item style={{paddingTop: '2px'}}>
              <Typography variant={"caption"}>Data Type</Typography>
            </Grid>
            <Grid item>
              <TextField select id={'fieldDataType_' + this.state.field.fieldId} size="small"
                         defaultValue="" variant="outlined" fullWidth
                         value={this.state.field.fieldDataType}
                         onChange={(event) => {
                           if (event.target.value === 'ID') {
                             this.state.field.transient = false;
                             this.state.field.nullable = false;
                             this.state.field.unique = true;
                           }
                           this.setFieldValue(this.state.field.fieldId, 'fieldDataType', event.target.value);
                         }}>
                {this.dataTypes.map((dataType) => (
                  <MenuItem key={dataType.value} value={dataType.value}>
                    {dataType.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid item>
            <Grid item>
              <Typography variant={"caption"}>DB Column Name</Typography>
            </Grid>
            <Grid item style={{paddingTop: '2px'}}>
              <OutlinedInput fullWidth
                             id={'dbColumnName_' + this.state.field.fieldId}
                             value={this.state.field.dbColumnName}
                             onChange={(event) => {
                               this.setFieldValue(this.state.field.fieldId, 'dbColumnName', event.target.value);
                             }}
                             margin="dense"/>
            </Grid>
          </Grid>

          <Grid item style={{width: '130px'}}>
            <Grid item>
              <Typography variant={"caption"}>Default value</Typography>
            </Grid>
            <Grid item style={{paddingTop: '2px'}}>
              <OutlinedInput fullWidth
                             id={'defaultValue_' + this.state.field.fieldId}
                             value={this.state.field.defaultValue}
                             onChange={(event) => {
                               this.setFieldValue(this.state.field.fieldId, 'defaultValue', event.target.value);
                             }}
                             margin="dense"/>
            </Grid>
          </Grid>

          <Grid item>
            <Grid item>
              <Typography variant={"caption"}>Transient</Typography>
            </Grid>
            <Grid item style={{paddingTop: '2px'}}>
              <Checkbox
                id={'transient_' + this.state.field.fieldId}
                color="primary"
                checked={this.state.field.transient}
                onChange={(event, checked) => {
                  this.setFieldValue(this.state.field.fieldId, 'transient', checked);
                }}
                inputProps={{'aria-label': 'secondary checkbox'}}/>
            </Grid>
          </Grid>

          <Grid item>
            <Grid item>
              <Typography variant={"caption"}>Nullable</Typography>
            </Grid>
            <Grid item style={{paddingTop: '2px'}}>
              <Checkbox
                id={'nullable_' + this.state.field.fieldId}
                color="primary"
                checked={this.state.field.nullable}
                onChange={(event, checked) => {
                  this.setFieldValue(this.state.field.fieldId, 'nullable', checked);
                }}
                inputProps={{'aria-label': 'secondary checkbox'}}/>
            </Grid>
          </Grid>

          <Grid item>
            <Grid item>
              <Typography variant={"caption"}>Unique</Typography>
            </Grid>
            <Grid item style={{paddingTop: '2px'}}>
              <Checkbox
                id={'nullable_' + this.state.field.fieldId}
                color="primary"
                checked={this.state.field.unique}
                onChange={(event, checked) => {
                  this.setFieldValue(this.state.field.fieldId, 'unique', checked);
                }}
                inputProps={{'aria-label': 'secondary checkbox'}}/>
            </Grid>
          </Grid>

          <Grid item style={{paddingTop: '20px', paddingLeft: '10px'}}>
            <Tooltip title="Apply">
              <IconButton
                size="small"
                color="primary"
                disabled={!this.allowSave()}
                onClick={() => {
                  this.state.field.editMode = false;
                  this.props.onUpdate(this.state.field);
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
                  this.setFieldValue(this.state.field.fieldId, 'editMode', false);
                  if (this.state.field.newField) {
                    this.setFieldValue(this.state.field.fieldId, 'deleted', true);
                    this.props.onUpdate(this.state.field);
                  }
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
    return this.state.field.editMode ? this.editView() : this.readonlyView();
  }
}