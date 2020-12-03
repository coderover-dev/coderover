import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
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
            editMode: props.field.editMode,
            field: props.field
        }
    }

    setFieldValue(fieldId, fieldAttribute, fieldValue) {
        let field = this.state.field;
        field[fieldAttribute] = fieldValue;
        this.setState({field: field});
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
                <Grid item style={{paddingRight: '10px', paddingTop: '5px'}}>
                    <Typography variant={"body1"}
                                style={{fontWeight: 'bolder'}}>{this.state.field.fieldName}</Typography>
                </Grid>
                <Grid item style={{paddingRight: '10px', paddingTop: '5px'}}>
                    <Typography variant={"body2"} style={{
                        fontWeight: 500,
                        fontStyle: "italic"
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
                <Grid item style={{paddingRight: '10px',paddingTop:'2px'}}>
                    <Tooltip title="Edit">
                        <IconButton style={{fontSize: '15pt', height: '10px'}}
                                    color="primary"
                                    onClick={() => {
                                        this.setState({editMode: true})
                                    }}>
                            <FontAwesomeIcon icon={faEdit}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton style={{fontSize: '15pt', height: '10px'}}
                                    color="primary"
                                    onClick={() => {
                                    }}>
                            <FontAwesomeIcon icon={faTimesCircle}/>
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
                paddingTop: '10px',
                paddingBottom: '10px'
            }}
                  key={'field_' + this.state.field.fieldId}>
                <Grid item container direction={"row"}>
                    <Grid item style={{padding: '5px'}}>
                        <Grid container direction={"column"}>
                            <Grid item style={{paddingTop: '2px'}}>
                                <Typography variant={"caption"}>Field Name</Typography>
                            </Grid>
                            <Grid item>
                                <OutlinedInput
                                    id={'fieldName_' + this.state.field.fieldId}
                                    value={this.state.field.fieldName}
                                    onChange={(event) => {
                                        let dbColumnName = this.state.field.dbColumnName;
                                        let fieldName = event.target.value;
                                        let newField = this.state.field.newField;
                                        let transient = this.state.field.transient;
                                        if (!transient && newField) {
                                            dbColumnName = camelCaseToSnakeCase(fieldName, dbColumnName);
                                            this.setFieldValue(this.state.field.fieldId, 'dbColumnName', dbColumnName);
                                        }
                                        this.setFieldValue(this.state.field.fieldId, 'fieldName', fieldName);
                                    }}
                                    margin="dense"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{padding: '5px', width: '160px'}}>
                        <Grid container direction={"column"}>
                            <Grid item style={{paddingTop: '2px'}}>
                                <Typography variant={"caption"}>Data Type</Typography>
                            </Grid>
                            <Grid item>
                                <TextField select id={'fieldDataType_' + this.state.field.fieldId} size="small"
                                           defaultValue="" variant="outlined" fullWidth
                                           value={this.state.field.fieldDataType}
                                           onChange={(event) => {
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
                    </Grid>
                    <Grid item style={{padding: '5px'}}>
                        <Grid container direction={"column"}>
                            <Grid item>
                                <Typography variant={"caption"}>DB Column Name</Typography>
                            </Grid>
                            <Grid item style={{paddingTop: '2px'}}>
                                <OutlinedInput
                                    id={'dbColumnName_' + this.state.field.fieldId}
                                    value={this.state.field.dbColumnName}
                                    onChange={(event) => {
                                        this.setFieldValue(this.state.field.fieldId, 'dbColumnName', event.target.value);
                                    }}
                                    margin="dense"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{padding: '5px'}}>
                        <Grid container direction={"column"}>
                            <Grid item>
                                <Typography variant={"caption"}>Default value</Typography>
                            </Grid>
                            <Grid item style={{paddingTop: '2px'}}>
                                <OutlinedInput
                                    id={'defaultValue_' + this.state.field.fieldId}
                                    value={this.state.field.defaultValue}
                                    onChange={(event) => {
                                        this.setFieldValue(this.state.field.fieldId, 'defaultValue', event.target.value);
                                    }}
                                    margin="dense"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container direction={"row"}>
                    <Grid item xs={6} style={{padding: '5px'}}>
                        <Grid container direction={"row"} spacing={1}>

                            <Grid item style={{paddingTop: '2px', paddingLeft: '5px', textAlign: "center"}}>
                                <Checkbox
                                    id={'transient_' + this.state.field.fieldId}
                                    color="primary"
                                    checked={this.state.field.transient}
                                    onChange={(event, checked) => {
                                        this.setFieldValue(this.state.field.fieldId, 'transient', checked);
                                    }}
                                    inputProps={{'aria-label': 'secondary checkbox'}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"caption"}>Transient</Typography>
                            </Grid>

                            <Grid item style={{paddingTop: '2px', paddingLeft: '5px', textAlign: "center"}}>
                                <Checkbox
                                    id={'nullable_' + this.state.field.fieldId}
                                    color="primary"
                                    checked={this.state.field.nullable}
                                    onChange={(event, checked) => {
                                        this.setFieldValue(this.state.field.fieldId, 'nullable', checked);
                                    }}
                                    inputProps={{'aria-label': 'secondary checkbox'}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"caption"}>Nullable</Typography>
                            </Grid>

                            <Grid item style={{paddingTop: '2px', paddingLeft: '5px', textAlign: "center"}}>
                                <Checkbox
                                    id={'nullable_' + this.state.field.fieldId}
                                    color="primary"
                                    checked={this.state.field.unique}
                                    onChange={(event, checked) => {
                                        this.setFieldValue(this.state.field.fieldId, 'unique', checked);
                                    }}
                                    inputProps={{'aria-label': 'secondary checkbox'}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"caption"}>Unique</Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={6} container spacing={1} justify={"flex-end"} direction={"row"}
                          style={{paddingTop: '5px'}}>
                        <Grid item>
                            <Tooltip title="Apply">
                                <Button
                                    variant={"contained"}
                                    size={"small"}
                                    color="primary"
                                    disabled={!this.allowSave()}
                                    onClick={() => {
                                        this.props.onUpdate(this.state.field);
                                        this.setState({editMode: false});
                                    }}
                                    startIcon={
                                        <FontAwesomeIcon style={{fontSize: '15pt'}} icon={faCheckCircle}/>
                                    }>Apply</Button>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Cancel">
                                <Button variant={"outlined"}
                                        size={"small"}
                                        color="primary"
                                        onClick={() => {
                                            if (this.state.field.newField) {
                                                this.props.onDelete(this.state.field.fieldId);
                                            }
                                            this.setState({editMode: false});
                                        }}
                                        startIcon={
                                            <FontAwesomeIcon style={{fontSize: '15pt'}} icon={faTimesCircle}/>
                                        }>Cancel</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    render() {
        return this.state.editMode ? this.editView() : this.readonlyView();
    }
}