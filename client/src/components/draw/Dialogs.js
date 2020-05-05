import Dialog from '../tools/Dialog'
import React from 'react'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

class Dialogs extends React.Component {

    state = {
        name: ''
    }

    handleOnChange = e => {
        this.setState({ name: e.target.value })
    }

    render() {
        const { name } = this.state
        const { save, start, duplicate, parent } = this.props
        return (
            <>
                <Dialog
                    header="Save Image"
                    open={save}
                    actions={[
                        <Button key='1' onClick={parent.handleSave}>Yes</Button>,
                        <Button key='2' onClick={parent.handleSaveDialogClose}>Cancel</Button>
                    ]}
                    var totalTextbox='1'
                    content={[
                        <h3 key='q'>Are You Sure to Save In Delit Database?</h3>,
                        <h3 key='w'>Old Version will be overwriten</h3>
                    ]} />

                <Dialog
                    header="Attention!"
                    open={start}
                    actions={[
                        <Button key='1' onClick={parent.handleGoBack}>Leave(to dashboard)</Button>,
                        <Button key='2' onClick={parent.handleDuplicateDialogOpen}>Make a Copy</Button>,
                        <Button key='3' onClick={parent.handleStartDialogClose}>Continue</Button>
                    ]}
                    var totalTextbox='1'
                    content={[
                        <h4 key='q'>You are not in team of this tileset</h4>,
                        <h4 key='w'>You operation will not be saved</h4>,
                        <strong key='e'>But you can still own and change it by making a copy of this tileset</strong>
                    ]} />

                <Dialog
                    header="Make a Copy of This Tileset"
                    open={duplicate}
                    actions={[
                        <Button key='1' onClick={parent.handleDuplicate.bind(this, name)}>Yes</Button>,
                        <Button key='2' onClick={parent.handleDuplicateDialogClose}>Cancel</Button>
                    ]}
                    var totalTextbox='1'
                    content={[
                        <h4 key='q'>Are You Sure to duplicate this tileset?</h4>,
                        <h4 key='w'>You will be the owner of the new tileset</h4>,
                        <h4 key='e'>Current Change Will be saved to Your new tilest</h4>,
                        <TextField
                            key='r'
                            className='duplicate-input'
                            label="Enter Name for your new tileset"
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={this.handleOnChange}
                        />
                    ]} />
            </>
        )
    }
}

export default Dialogs