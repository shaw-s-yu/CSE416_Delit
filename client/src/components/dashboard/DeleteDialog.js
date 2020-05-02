import React from 'react'
import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";

import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class DeleteDialog extends React.Component {


    handleClose = () => {
        this.props.handleClose('remove')
    }

    handleSubmit = (callback) => {
        const { item } = this.props
        callback({
            variables: {
                id: item._id
            }
        })
        this.handleClose()
    }

    render() {
        const { open, item, user, refetch, selected } = this.props
        if (!item) return null
        const mutation = selected === 'tileset' ? MutationList.REMOVE_TILESET : MutationList.REMOVE_PROJECT
        const disabled = item.ownerInfo.username === user.username ? false : true
        return (
            <Mutation mutation={mutation} refetchQueries={[refetch]}>
                {(removeItem, res) => (
                    <Dialog
                        header="Delete Project?"
                        open={open}
                        actions={[
                            <Button key='1' disabled={disabled} onClick={this.handleSubmit.bind(this, removeItem)}>Confirm</Button>,
                            <Button key='2' onClick={this.handleClose}>Cancel</Button>,
                        ]}
                        var totalTextbox='1'
                        content={
                            <section className="dialog_content" id="textBoxes">
                                <h3>Are You Sure to Delete This Project</h3>
                                <h3>This Can not be Undo, No Backup</h3>
                                {disabled ? <p className='red'>You Are not the Owner YOu cannot delete it</p> : null}
                            </section>
                        } />
                )}
            </Mutation>
        )
    }
}

export default DeleteDialog