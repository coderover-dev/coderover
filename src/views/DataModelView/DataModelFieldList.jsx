import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Button, Divider, Typography} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faSearch, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {DataModelField} from "./DataModelField";
import {v4 as uuidv4} from "uuid";
import InputAdornment from "@material-ui/core/InputAdornment";

export class DataModelFieldList extends React.Component {

  constructor(props) {
    super(props);
    this.fieldCount = 0;
    // need to handle default transient fields
    // when a new field is added it should take the value from this.transient
    this.transient = props.transient;
    this.state = {
      searchField: ""
    }
  }

  render() {
    return (
      <div>
        <Grid item container style={{
          textAlign: "left",
          paddingTop: "10px",
          paddingBottom: "10px"
        }}>
          <Grid item container spacing={2} direction="row"
                style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  margin: '1px'
                }}>
            <Grid item style={{
              paddingTop: '10px',
              marginLeft: 8
            }}>
              <span style={{fontWeight: "bold", fontSize: "14pt"}}>Fields</span>
            </Grid>
            <Grid item style={{paddingLeft: '10px'}}>
              <Tooltip title="Add a new field">
                <Button variant={"outlined"}
                        size={"small"}
                        color="primary"
                        style={{fontSize: '9pt'}}
                        onClick={this.props.onAdd}
                        startIcon={<FontAwesomeIcon style={{fontSize: '12pt'}}
                                                    icon={faPlusCircle}/>}>Add</Button>
              </Tooltip>
            </Grid>
            <Grid item style={{paddingLeft: '2px'}}>
              <OutlinedInput
                style={{width: '155px', height: '30px', fontSize: '8pt'}}
                id="dataModelName"
                value={this.state.searchField}
                onChange={(event) => {
                  this.setState({
                    searchField: event.target.value
                  })
                }}
                placeholder="filter"
                startAdornment={
                  <FontAwesomeIcon color="#3b444b"
                                   style={{fontSize: '12pt'}}
                                   icon={faSearch}/>
                }
                margin="dense"/>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{paddingLeft: '10px'}}>
          {
            Object.keys(this.props.fields)
              .map(fieldId => this.props.fields[fieldId])
              .filter(field => !field.deleted)
              .map(field =>
                (<DataModelField key={field.fieldId}
                                 field={field}
                                 onUpdate={this.props.onUpdate}
                                 onDelete={this.props.onDelete}/>)
              )
          }
        </Grid>
      </div>

    )
  }
}