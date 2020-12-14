import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {Divider, IconButton, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Subject} from "rxjs";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import {NavigateNext} from "@material-ui/icons";

export let breadcrumbSubject = new Subject();

export class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: "",
      component: ""
    }

    let handleBreadcrumbUpdate = this.handleBreadcrumbUpdate.bind(this);
    this.breadcrumbSubjectSubscription = breadcrumbSubject.subscribe(handleBreadcrumbUpdate);
  }

  componentWillUnmount() {
    this.breadcrumbSubjectSubscription.unsubscribe();
  }

  handleBreadcrumbUpdate(data) {
    this.setState(data);
  }

  render() {
    return (
        <div style={{backgroundColor: "#e7e2e7", height: '24px', paddingLeft: '10px'}}>

          <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small"/>}>

            <Link color="inherit" href="#">
              <Grid container spacing={1}>
                <Grid item>
                  <FontAwesomeIcon icon={faHome}/>
                </Grid>
                <Grid item>
                  <Typography variant="body1"
                              className={"BreadcrumbText-bold"}>
                    {this.state.project}
                  </Typography>
                </Grid>
              </Grid>
            </Link>

            <Link color="inherit" href="#">
              <Grid container spacing={1}>
                <Grid item>
                  <Typography variant="body1"
                              className={"BreadcrumbText-bold"}>
                    {this.state.component}
                  </Typography>
                </Grid>
              </Grid>
            </Link>

          </Breadcrumbs>
        </div>
    )
  }
}