import React from "react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import './Workspace.css'

export class ComponentTab extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
  }

  render() {
    let tabClassName = (this.props.data.tabId === this.props.value) ? 'SelectedTab' : 'OtherTab';
    return (
      <div style={{
        minWidth: '120px',
        maxWidth: '120px',
        height: '38px',
        marginLeft: 1,
        paddingLeft: '8px',
        paddingRight: '8px',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        border: '1px solid rgb(206, 206, 206)'
      }} className={tabClassName}
           onClick={() => {
             if (this.props.onTabSelection !== undefined) {
               this.props.onTabSelection(this.props.data.tabId);
             }
           }}>
        <Grid container direction={"row"} justify={"space-evenly"}
              style={{textAlign: "left", lineHeight: 1.2}}>
          <Grid item container direction={"column"} xs={10} style={{paddingTop: '4px'}}>
            <Grid item style={{
              fontSize: '7pt',
            }}>{this.getTabTypeLabel(this.props.data.componentType)}</Grid>
            <Grid item style={{
              fontSize: '10pt',
              fontWeight: 'bolder',
              color: 'var(--fg-primary--shade--one)'
            }}>{this.props.data.componentName}</Grid>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Close">
              <IconButton
                size="small"
                color="primary"
                onClick={() => {
                  if (this.props.onClose !== undefined && this.props.onClose != null) {
                    this.props.onClose(this.props.data);
                  }
                }}>
                <FontAwesomeIcon icon={faTimesCircle} style={{fontSize: '12pt'}}/>
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
    )
  }

  getTabTypeLabel(tabType) {
    switch (tabType.toUpperCase()) {
      case "DATA_MODEL":
        return "Data Models";
      default:
        return "";
    }
  }
}