import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import React from 'react'
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class RenameDialog extends React.Component {



    state = {
        name: ''
    }

    handleOnChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleSubmit = (callback) => {
        callback({
            variables: {
                id: this.props.item._id,
                name: this.state.name === '' ? this.props.item.name : this.state.name
            }
        })
        this.props.handleClose('rename')
    }


    render() {

        const { open, item, user, refetch, handleClose, selected } = this.props
        if (!item) return null

        const disabled = item.ownerInfo.username === user.username ? false : true
        const mutation = selected === 'tileset' ? MutationList.UPDATE_TILESET : MutationList.UPDATE_PROJECT
        return (
            <Mutation mutation={mutation} refetchQueries={[refetch]}>
                {(updateItem, res) => (
                    <Dialog
                        header="Rename Project"
                        open={open}
                        actions={[
                            <Button key='1' onClick={this.handleSubmit.bind(this, updateItem)} disabled={disabled}>Enter</Button>,
                            <Button key='2' onClick={handleClose.bind(this, 'rename')}>Cancel</Button>,
                        ]}
                        content={
                            <>
                                {disabled ? <p className='red'>You are not the Owner, You cannot Rename</p> : null}
                                <TextField
                                    className="form-control"
                                    label="Enter Project Name"
                                    type="name"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={item.name}
                                    onChange={this.handleOnChange}
                                />
                            </>
                        } />
                )}
            </Mutation>
        )
    }
}

export default RenameDialog