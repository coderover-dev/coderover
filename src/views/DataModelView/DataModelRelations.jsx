import * as React from "react";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Tooltip from "@material-ui/core/Tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faSearch} from "@fortawesome/free-solid-svg-icons";
import {DataModelField} from "./DataModelField";
import {DataModelRelation} from "./DataModelRelation";

export class DataModelRelations extends React.Component {

  constructor(props) {
    super(props);
    this.fieldCount = 0;
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
              paddingTop: '8px',
              marginLeft: 2
            }}>
              <span style={{fontWeight: "bold", fontSize: "14pt"}}>Relations</span>
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
                style={{width: '155px', height: '24px', fontSize: '8pt'}}
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
            Object.keys(this.props.relations)
              .map(fieldId => this.props.relations[fieldId])
              .filter(relation => !relation.deleted)
              .map(relation =>
                (<DataModelRelation
                                 dataModelName={this.props.dataModelName}
                                 dataModelFieldMap={this.props.dataModelFieldMap}
                                 key={relation.fieldId}
                                 relation={relation}
                                 onUpdate={this.props.onUpdate}
                                 onDelete={this.props.onDelete}/>)
              )
          }
        </Grid>
      </div>

    )
  }
}