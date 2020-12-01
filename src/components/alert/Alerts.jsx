import React from "react";
import {Subject} from 'rxjs'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const alerts = new Subject();

export const ALERT_OK = 'ALERT_OK';
export const ALERT_CONFIRM = 'ALERT_CONFIRM';


export function pushAlert(key, type, titleText, contentText, confirmCallback, dismissCallback) {
    alerts.next({
        key: key,
        type: type,
        titleText: titleText,
        contentText: contentText,
        confirmCallback: confirmCallback,
        dismissCallback: dismissCallback
    })
}

export class Alerts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alerts: []
        }

        let addAlertToQueue = this.addAlertToQueue.bind(this);
        this.alertSubscription = alerts.subscribe(addAlertToQueue);
    }

    componentWillUnmount() {
        this.alertSubscription.unsubscribe();
    }

    addAlertToQueue(alert) {
        let alerts = this.state.alerts;
        alerts.push(alert);
        this.setState({
            alerts: alerts
        });
    }

    dismiss(key) {
        let alerts = this.state.alerts;
        alerts = alerts.filter(alert => alert['key'] !== key);
        this.setState({
            alerts: alerts
        });
    }

    getAlertButtons(alert) {
        if (alert.type === ALERT_OK) {
            return (
                <div>
                    <Button onClick={() => {
                        this.dismiss(alert.key);
                        alert.dismissCallback(alert.key);
                    }} color="primary" autoFocus>OK</Button>
                </div>
            )
        } else if (alert.type === ALERT_CONFIRM) {
            return (
                <div>
                    <Button onClick={() => {
                        this.dismiss(alert.key);
                        alert.dismissCallback(alert.key)
                    }} color="primary">Cancel</Button>
                    <Button onClick={() => {
                        this.dismiss(alert.key);
                        alert.confirmCallback(alert.key)
                    }} color="primary" autoFocus>Confirm</Button>
                </div>
            )
        }
    }

    getAlertDialog(alert) {
        return (
            <Dialog
                id={'alert_' + alert.key}
                maxWidth="sm" disableEscapeKeyDown="false" disableBackdropClick="false"
                open={true}
                onClose={() => {
                    this.dismiss(alert.key);
                    alert.dismissCallback(alert.key)
                }}>
                <DialogTitle>{alert.titleText}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alert.contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {this.getAlertButtons(alert)}
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        if (this.state.alerts != null) {
            return (
                <div>{this.state.alerts.map((alert) => this.getAlertDialog(alert))}</div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

}