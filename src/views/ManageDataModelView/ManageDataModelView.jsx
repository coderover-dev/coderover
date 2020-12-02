import * as React from "react";
import Grid from "@material-ui/core/Grid";
import './ManageDataModelView.css'

import {getRenderer} from "../../renderer/renderer";
import {Divider, Typography} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export class ManageDataModelView extends React.Component {

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
        this.renderer = getRenderer();

        this.state = {
            dataModelName: "",
            tableName: "",
            dataTransferOnly: false,
            fields: [],
            searchField: ""
        }
    }

    addNewField() {
        let fields = this.state.fields;
        fields.push({
            idx: this.state.fields.length + 1,
            fieldName: "",
            fieldDataType: "",
            dbColumnName: "",
            nullable: true,
            defaultValue: "",
            transient: false,
            refDataModelName: "",
            refFieldName: "",
            refKeyName: ""
        })
        this.setState({
            fields: fields
        })
    }

    setFieldValue(idx, fieldAttribute, fieldValue) {
        this.state.fields.map(field => {
            if (field.idx === idx) {
                field[fieldAttribute] = fieldValue;
            }
        });

        this.setState({fields: this.state.fields});
    }

    fieldListItem(field) {
        let itemBgColor = (field.idx % 2 === 0) ? '#ffffff' : '#f9f9f9';

        return (
            <Grid container direction="row" style={{border: '1px solid #cecece', backgroundColor: itemBgColor}}
                  key={'field_' + field.idx}>
                <Grid item style={{padding: '5px'}}>
                    <Grid container direction={"column"}>
                        <Grid item style={{paddingTop: '2px'}}>
                            <Typography variant={"caption"}>Field Name</Typography>
                        </Grid>
                        <Grid item>
                            <OutlinedInput
                                id={'fieldName_' + field.idx}
                                value={field.fieldName}
                                onChange={(event) => {
                                    this.setFieldValue(field.idx, 'fieldName', event.target.value);
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
                            <TextField select id={'fieldDataType_' + field.idx} size="small"
                                       defaultValue="" variant="outlined" fullWidth
                                       value={field.fieldDataType}
                                       onChange={(event) => {
                                           this.setFieldValue(field.idx, 'fieldDataType', event.target.value);
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
                                id={'dbColumnName_' + field.idx}
                                value={field.dbColumnName}
                                onChange={(event) => {
                                    this.setFieldValue(field.idx, 'dbColumnName', event.target.value);
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
                                id={'defaultValue_' + field.idx}
                                value={field.defaultValue}
                                onChange={(event) => {
                                    this.setFieldValue(field.idx, 'defaultValue', event.target.value);
                                }}
                                margin="dense"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{padding: '5px'}}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <Typography variant={"caption"}>Transient</Typography>
                        </Grid>
                        <Grid item style={{paddingTop: '2px', textAlign: "center"}}>
                            <Checkbox
                                id={'transient_' + field.idx}
                                color="primary"
                                value={field.transient}
                                onChange={(event) => {
                                    this.setFieldValue(field.idx, 'transient', event.target.value);
                                }}
                                inputProps={{'aria-label': 'secondary checkbox'}}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item style={{padding: '5px'}}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <Typography variant={"caption"}>Nullable</Typography>
                        </Grid>
                        <Grid item style={{paddingTop: '2px', textAlign: "center"}}>
                            <Checkbox
                                id={'nullable_' + field.idx}
                                color="primary"
                                value={field.nullable}
                                onChange={(event) => {
                                    this.setFieldValue(field.idx, 'nullable', event.target.value);
                                }}
                                inputProps={{'aria-label': 'secondary checkbox'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    fieldList() {
        return (
            <Grid container direction="column">
                <Grid item>{this.state.fields.map(field => this.fieldListItem(field))}</Grid>
            </Grid>
        )
    }

    getForm() {
        return (
            <Grid container direction={"column"} style={{padding: '15px'}}>
                <Grid item container direction="row" xs={12}>
                    <Grid item style={{textAlign: "left", paddingTop: "10px"}} xs={4}>
                        <Typography variant={"caption"}>Name :</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <OutlinedInput
                            id="dataModelName"
                            value={this.state.dataModelName}
                            onChange={(event) => {
                                this.setState({
                                    dataModelName: event.target.value
                                })
                            }}
                            margin="dense"/>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={12}>
                    <Grid item style={{textAlign: "left", paddingTop: "10px"}} xs={4}>
                        <Typography variant={"caption"}>Table name :</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <OutlinedInput
                            id="tableName"
                            value={this.state.tableName}
                            onChange={(event) => {
                                this.setState({tableName: event.target.value});
                            }}
                            margin="dense"/>
                    </Grid>
                </Grid>
                <Grid item container direction="row" xs={12}>
                    <Grid item style={{textAlign: "left", paddingTop: "10px"}} xs={4}>
                        <Typography variant={"caption"}>Data transfer only</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Checkbox
                            color="primary"
                            value={this.state.dataTransferOnly}
                            onChange={(event) => {
                                this.setState({dataTransferOnly: event.target.value});
                            }}
                            inputProps={{'aria-label': 'secondary checkbox'}}/>
                    </Grid>
                </Grid>
                <Grid item container direction="column" xs={12}>
                    <Grid item style={{textAlign: "left", paddingTop: "10px", paddingBottom: "10px"}}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Grid container direction={"row"}>
                                    <Grid item>
                                        <Typography variant="h6">Fields</Typography>
                                    </Grid>
                                    <Grid item style={{paddingLeft: '5px', paddingTop: '3px'}}>
                                        <Typography variant="subtitle1">{'(' + this.state.fields.length + ')'}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item style={{paddingTop: '10px'}}>
                                <Tooltip title="Add a new field">
                                    <IconButton color="primary"
                                                style={{fontWeight: 'bold', fontSize: '14pt', padding: 0}}
                                                onClick={() => this.addNewField()}>
                                        <FontAwesomeIcon className="dataTableButtonIcon" color="primary"
                                                         icon={faPlusCircle}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item style={{paddingTop: '8px'}}>
                                <OutlinedInput
                                    id="dataModelName"
                                    value={this.state.searchField}
                                    onChange={(event) => {
                                        this.setState({
                                            searchField: event.target.value
                                        })
                                    }}
                                    placeholder="filter"
                                    startAdornment={
                                        <FontAwesomeIcon color="#3b444b" icon={faSearch}/>
                                    }
                                    margin="dense"/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {this.fieldList()}
                    </Grid>
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
                <Grid item>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Create data model</Typography>
                </Grid>
                <Grid item>
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