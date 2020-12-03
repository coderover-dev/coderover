import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import {DataModelField} from "./DataModelField";
import {v4 as uuidv4} from "uuid";

export class DataModelFieldList extends React.Component {


    constructor(props) {
        super(props);
        this.fieldCount = 0;
        // need to handle default transient fields
        // when a new field is added it should take the value from this.transient
        this.transient = props.transient;
        this.state = props.fields;
    }


    getFieldCount() {
        return this.fieldCount;
    }

    handleAddField() {
        let state = {};
        let fieldId = uuidv4();
        state[fieldId] = {
            newField: true,
            editMode: true,
            fieldId: fieldId,
            fieldName: "",
            fieldDataType: "",
            dbColumnName: "",
            defaultValue: "",
            transient: this.transient,
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
        let state = {};
        let fieldId = updatedField.fieldId;
        state[fieldId] = updatedField;
        state[fieldId].newField = false;
        this.setState(state);
    }

    handleFieldDelete(fieldId) {
        let state = {};
        state[fieldId] = this.state[fieldId];
        state[fieldId].deleted = true;
        this.fieldCount = this.fieldCount - 1;
        this.setState(state);
    }


    render() {
        return (
            <div>
                <Grid item style={{textAlign: "left", paddingTop: "10px", paddingBottom: "10px"}}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Grid container direction={"row"}>
                                <Grid item>
                                    <Typography variant="h6">Fields</Typography>
                                </Grid>
                                <Grid item style={{paddingLeft: '5px', paddingTop: '3px'}}>
                                    <Typography
                                        variant="subtitle1">{'(' + this.getFieldCount() + ')'}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{paddingTop: '10px'}}>
                            <Tooltip title="Add a new field">
                                <IconButton color="primary"
                                            style={{fontWeight: 'bold', fontSize: '14pt', padding: 0}}
                                            onClick={() => this.handleAddField()}>
                                    <FontAwesomeIcon className="iconButton" color="primary"
                                                     icon={faPlusCircle}/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item style={{paddingTop: '8px', paddingLeft: '8px'}}>
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
                <Grid item xs={12}>
                    {
                        Object.keys(this.state)
                            .map(fieldId => this.state[fieldId])
                            .filter(field => !field.deleted)
                            .map(field =>
                                (<DataModelField key={field.fieldId}
                                                 field={field}
                                                 onUpdate={(updatedField) => this.handleFieldUpdate(updatedField)}
                                                 onDelete={(fieldId) => this.handleFieldDelete(fieldId)}/>)
                            )
                    }
                </Grid>
            </div>

        )
    }
}