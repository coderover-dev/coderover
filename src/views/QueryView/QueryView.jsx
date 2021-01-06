import * as React from "react";
import Grid from "@material-ui/core/Grid";
import './QueryView.css'

import {getRenderer} from "../../renderer/renderer";
import {Divider, Typography} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import {workspaceData} from "../../shared/workspace-data";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

export class QueryView extends React.Component {

  constructor(props) {
    super(props);
    this.renderer = getRenderer();
    this.state = {
      ...props,
      dataModel: ""
    }
    this.state.dirty = false;
  }

  stateUpdated() {
    this.props.onUpdate(this.state);
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

    if (this.state == null || Object.keys(this.state).length === 0) {
      this.state = state;
    } else {
      this.setState(state, this.stateUpdated.bind(this))
    }
  }

  getDataModels() {
    let dataModels = [];
    if (this.props.dataModels === undefined || this.props.dataModels == null) {
      return dataModels;
    }

    let dataModelIds = Object.keys(this.props.dataModels);
    for (let i = 0; i < dataModelIds.length; i++) {
      let dataModel = this.props.dataModels[dataModelIds[i]];
      dataModels.push({key: dataModel.id, value: dataModel.dataModelName});
    }
    return dataModels;
  }

  getQueryForm() {
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
              <span style={{fontWeight: "bold", fontSize: "14pt"}}>Query</span>
            </Grid>
            <Grid item style={{paddingLeft: '10px'}}>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} style={{paddingLeft: '10px'}}>
          <TextareaAutosize aria-label="query text"
                            style={{width: '100%', height: '100px', border: '1px solid var(--bg-primary--shade--four)'}}/>
        </Grid>
      </div>
    )
  }

  getForm() {
    return (
      <Grid container direction={"column"} spacing={2}>
        <Grid item container direction="row" style={{paddingTop: "10px"}} xs={12} spacing={2}>
          <Grid item style={{textAlign: "left"}}>
            <Typography variant={"caption"}>Name</Typography>
          </Grid>
          <Grid item style={{textAlign: "left"}}>
            <OutlinedInput
              id={'queryName_' + this.state.id}
              value={this.state.queryName}
              style={{minWidth: '200px'}}
              onChange={(event) => {
                this.setState({
                  queryName: event.target.value.replace(/[^\w\s]/gi, ""),
                  dirty: true
                }, this.stateUpdated.bind(this))
              }}
              margin="dense"/>
          </Grid>
          <Grid item style={{textAlign: "left"}}>
            <Typography variant={"caption"}>Data Model name</Typography>
          </Grid>
          <Grid item>
            <TextField select id={'dataModel_' + this.state.id} size="small"
                       defaultValue="" variant="outlined" fullWidth
                       style={{minWidth: '200px'}}
                       value={this.state.dataModel}
                       onChange={(event) => {
                         this.setState({dataModel: event.target.value});
                       }}>
              {
                this.getDataModels().map((dataModel) => (
                  <MenuItem key={dataModel.key} value={dataModel.key}>
                    {dataModel.value}
                  </MenuItem>))
              }
              }
            </TextField>
          </Grid>
        </Grid>
        <Grid item>
          <Divider/>
        </Grid>
        <Grid item>
          {this.getQueryForm()}
        </Grid>
      </Grid>
    );
  }


  render() {
    return (
      <Grid container direction="column" style={{padding: '15px', minWidth: '850px', maxWidth: '100%'}}>
        <Grid item container direction="row">
          <Grid item xs={7}>
            <Typography variant="h6" style={{fontWeight: 'bold'}}>
              Query : <span style={{fontWeight: "bolder", color: "#1569C7"}}>{this.state.queryName}</span>
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