import Dialog from '../tools/Dialog'
import React from 'react'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class Dialogs extends React.Component {

    state = {
        name: ''
    }

    handleOnChange = e => {
        this.setState({ name: e.target.value })
    }

    render() {
        const { name } = this.state
        const { save, start, duplicate, parent, confirmSave, publish, saved, saveErrorMsg } = this.props
        return (
            <>
                {save === undefined ? null : <Dialog
                    header="Save Tileset"
                    open={save}
                    actions={[
                        <Button key='1' onClick={parent.handleSave}>Yes</Button>,
                        <Button key='2' onClick={parent.handleSaveDialogClose}>Cancel</Button>
                    ]}
                    content={[
                        <h3 key='q'>Are You Sure to Save In Delit Database?</h3>,
                        <h3 key='w'>Old Version will be overwriten</h3>
                    ]} />}

                {start === undefined ? null : <Dialog
                    header="Attention!"
                    open={start}
                    actions={[
                        <Button key='1' onClick={parent.handleGoBack}>Leave(to dashboard)</Button>,
                        <Button key='2' onClick={parent.handleDuplicateDialogOpen}>Make a Copy</Button>,
                        <Button key='3' onClick={parent.handleStartDialogClose}>Continue</Button>
                    ]}
                    content={[
                        <h4 key='q'>You are not in team of this tileset</h4>,
                        <h4 key='w'>You operation will not be saved</h4>,
                        <strong key='e'>But you can still own and change it by making a copy of this tileset</strong>
                    ]} />}

                {duplicate === undefined ? null : <Dialog
                    header="Make a Copy of This Tileset"
                    open={duplicate}
                    actions={[
                        <Button key='1' onClick={parent.handleDuplicate.bind(this, name)}>Yes</Button>,
                        <Button key='2' onClick={parent.handleDuplicateDialogClose}>Cancel</Button>
                    ]}
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
                }
                {confirmSave === undefined ? null : <Dialog
                    header="Saving Tileset"
                    open={confirmSave}
                    actions={[
                        <Button key='1' onClick={parent.handleGoBack} disabled={!saved}>Leave(to dashboard)</Button>,
                        <Button key='2' onClick={parent.handleConfirmSaveDialogClose}>Cancel</Button>
                    ]}
                    content={[
                        saved ? <h3 key='q'>Your Tileset is save successfully</h3> : <h3 key='q'>Your Tileset is being saved</h3>,
                        saveErrorMsg === '' ? null : <h3 key='w'>saveErrorMsg</h3>,
                        saveErrorMsg === '' ? saved ? <i key='e' className="fas fa-check-circle dialog-saved-icon"></i> : <CircularProgress key='e' className="wait-saving" /> : <i key='e' class="fas fa-times-circle dialog-saved-error"></i>,
                    ]} />
                }

                {publish === undefined ? null :

                    <Mutation mutation={MutationList.PUBLISH_TILESET} onCompleted={() => { parent.handleRefreshAfterPublished() }}>
                        {(updateTileset, res) => {
                            return (
                                <Dialog
                                    header="Saving Tileset"
                                    open={publish}
                                    actions={[
                                        <Button key='1' onClick={() => { updateTileset({ variables: { id: parent.display.getTilesetId() } }) }}>Confirm</Button>,
                                        <Button key='2' onClick={parent.handlePublishDialogClose}>Cancel</Button>
                                    ]}
                                    content={[
                                        <h3 key='1'>Are You Sure to Publish This Tileset</h3>,
                                        <h3 key='2'>By Publishing it, you will be able to use it in your map</h3>,
                                        <h3 key='3'>But You wont be able to edit this one again</h3>,
                                    ]} />
                            )
                        }}

                    </Mutation>
                }
            </>
        )
    }
}

export default Dialogs