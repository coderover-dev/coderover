import * as React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {IconButton} from "@material-ui/core";

export class Breadcrumbs extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: "#e7e2e7", height: '24px'}}>
                <IconButton style={{fontSize: '11pt', height: '10px', paddingLeft: '18px'}}>
                    <FontAwesomeIcon icon={faHome}/>
                </IconButton>
            </div>
        )
    }
}