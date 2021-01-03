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
  }

  setFieldValue(fieldId, fieldAttribute, fieldValue) {
    let field = this.props.field;
    field[fieldAttribute] = fieldValue;
    this.props.onUpdate(field);
  }

  allowSave() {
    if (this.props.field.fieldName.trim() !== "" &&
      this.props.field.fieldDataType.trim() !== "") {
      if (!this.props.field.transient && this.props.field.dbColumnName.trim() !== "") {
        return true;
      } else {
        return this.props.field.transient;
      }
    }

    return false;
  }

  readonlyView() {
    return (
      <Grid container direction="row" style={{height: '35px', width: '100%'}}
            key={'field_' + this.props.field.fieldId}>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px', minWidth: '150px'}}>
          <Typography variant={"body1"}
                      style={{fontWeight: 'bolder'}}>{this.props.field.fieldName}</Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '4px'}}>
          <Typography variant={"body2"} style={{
            fontWeight: "bolder",
            fontStyle: "italic",
            color:"gray"
          }}>{this.props.field.fieldDataType}</Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px'}}>
          <Typography
            variant={"body2"}>
            {(this.props.field.transient != null && this.props.field.transient) ? 'transient' : ''}
          </Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px'}}>
          <Typography
            variant={"body2"}>
            {(this.props.field.nullable != null && this.props.field.nullable) ? 'nullable' : ''}
          </Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '5px'}}>
          <Typography
            variant={"body2"}>
            {(this.props.field.unique != null && this.props.field.unique) ? 'unique' : ''}</Typography>
        </Grid>
        <Grid item style={{paddingRight: '10px', paddingTop: '4px'}}>
          <Tooltip title="Edit">
            <IconButton style={{fontSize: '14pt', height: '10px'}}
                        color="primary"
                        onClick={() => {
                          this.setFieldValue(this.props.field.fieldId, 'editMode', true);
                        }}>
              <FontAwesomeIcon icon={faEdit} style={{fontSize:'10pt'}}/><span style={{fontSize:'10pt'}}>&nbsp;Edit</span>
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton style={{fontSize: '14pt', height: '10px'}}
                        color="primary"
                        onClick={() => {
                          this.setFieldValue(this.props.field.fieldId, 'deleted', true);
                        }}>
              <FontAwesomeIcon icon={faTimesCircle} style={{fontSize:'10pt'}}/><span style={{fontSize:'10pt'}}>&nbsp;Delete</span>
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
            key={'field_' + this.props.field.fieldId}>
        <Grid item container direction={"row"} spacing={2}>

          <Grid item style={{width: '150px'}}>
            <Grid item style={{paddingTop: '2px'}}>
              <Typography variant={"caption"}>Field Name</Typography>
            </Grid>
            <Grid item>
              <OutlinedInput fullWidth
                             id={'fieldName_' + this.props.field.fieldId}
                             value={this.props.field.fieldName}
                             onChange={(event) => {
                               let dbColumnName = this.props.field.dbColumnName;
                               let fieldName = event.target.value;
                               //let newField = this.props.field.newField;
                               let transient = this.props.field.transient;
                               if (!transient) {
                                 dbColumnName = camelCaseToSnakeCase(fieldName, dbColumnName);
                                 this.setFieldValue(this.props.field.fieldId, 'dbColumnName', dbColumnName);
                               }
                               this.setFieldValue(this.props.field.fieldId, 'fieldName', fieldName);
                             }}
                             margin="dense"/>
            </Grid>
          </Grid>

          <Grid item style={{width: '150px'}}>
            <Grid item style={{paddingTop: '2px'}}>
              <Typography variant={"caption"}>Data Type</Typography>
            </Grid>
            <Grid item>
              <TextField select id={'fieldDataType_' + this.props.field.fieldId} size="small"
                         defaultValue="" variant="outlined" fullWidth
                         value={this.props.field.fieldDataType}
                         onChange={(event) => {
                           if (event.target.value === 'ID') {
                             this.props.field.transient = false;
                             this.props.field.nullable = false;
                             this.props.field.unique = true;
                           }
                           this.setFieldValue(this.props.field.fieldId, 'fieldDataType', event.target.value);
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
                             id={'dbColumnName_' + this.props.field.fieldId}
                             value={this.props.field.dbColumnName}
                             onChange={(event) => {
                               this.setFieldValue(this.props.field.fieldId, 'dbColumnName', event.target.value);
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
                             id={'defaultValue_' + this.props.field.fieldId}
                             value={this.props.field.defaultValue}
                             onChange={(event) => {
                               this.setFieldValue(this.props.field.fieldId, 'defaultValue', event.target.value);
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
                id={'transient_' + this.props.field.fieldId}
                color="primary"
                checked={this.props.field.transient}
                onChange={(event, checked) => {
                  this.setFieldValue(this.props.field.fieldId, 'transient', checked);
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
                id={'nullable_' + this.props.field.fieldId}
                color="primary"
                checked={this.props.field.nullable}
                onChange={(event, checked) => {
                  this.setFieldValue(this.props.field.fieldId, 'nullable', checked);
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
                id={'nullable_' + this.props.field.fieldId}
                color="primary"
                checked={this.props.field.unique}
                onChange={(event, checked) => {
                  this.setFieldValue(this.props.field.fieldId, 'unique', checked);
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
                  this.props.field.editMode = false;
                  this.props.onUpdate(this.props.field);
                }}>
                <FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'12pt'}}/><span style={{fontSize:'12pt'}}>&nbsp;Save</span>
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item style={{paddingTop: '20px'}}>
            <Tooltip title="Cancel">
              <IconButton
                size="small"
                color="primary"
                onClick={() => {
                  if (this.props.field.newField) {
                    this.setFieldValue(this.props.field.fieldId, 'deleted', true);
                  }
                  this.setFieldValue(this.props.field.fieldId, 'editMode', false);
                }}>
                <FontAwesomeIcon icon={faTimesCircle} style={{fontSize:'12pt'}}/><span style={{fontSize:'12pt'}}>&nbsp;Discard</span>
              </IconButton>
            </Tooltip>
          </Grid>

        </Grid>
      </Grid>
    )
  }

  render() {
    return this.props.field.editMode ? this.editView() : this.readonlyView();
  }
}