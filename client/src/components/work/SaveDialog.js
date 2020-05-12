import Dialog from '../tools/Dialog'
import React from 'react'
import { Button } from "react-bootstrap";
import CircularProgress from '@material-ui/core/CircularProgress';

class SaveDialog extends React.Component {

    render() {
        const { open, parent, saving, savemsg, saveConfirmed } = this.props
        return (
            <Dialog
                header="Save Project"
                open={open}
                actions={[
                    <Button key='1' disabled={saving} onClick={parent.handleSave}>Confirm</Button>,
                    <Button key='2' onClick={parent.handleSaveDialogClose}>Cancel</Button>
                ]}
                content={[
                    <h3 key='e'>Are You Sure to Save Project</h3>,
                    (saveConfirmed === false && saving) ? <CircularProgress key='w' className="wait-saving" /> : null,
                    <p key='q'>{savemsg}</p>,
                ]} />
        )
    }
}

export default SaveDialog
