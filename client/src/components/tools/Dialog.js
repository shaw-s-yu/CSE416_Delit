import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
class BetterDialog extends React.Component {

    render() {

        const { open, maxWidth, fullWidth, style, header, content, actions } = this.props

        return (
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth={maxWidth}
                fullWidth={fullWidth}
                style={style}
            >
                <DialogTitle id="alert-dialog-title">
                    {header}
                </DialogTitle>
                <DialogContent>
                    {content}
                </DialogContent>
                <DialogActions>
                    {
                        actions && actions.map(action => {
                            return action
                        })
                    }
                </DialogActions>
            </Dialog>

        )
    }

}

export default BetterDialog;
