import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class BetterDialog extends React.Component {

    render() {

        return (
            <Dialog
                open={this.props.open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={this.props.maxWidth}
                fullWidth={this.props.fullWidth}
            >
                <DialogTitle id="alert-dialog-title">
                    {this.props.header}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {this.props.actions}
                </DialogActions>
            </Dialog>

        )
    }

}

export default BetterDialog;
