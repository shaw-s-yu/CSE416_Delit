import React from 'react'
import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";

import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class DeleteDialog extends React.Component {


    handleClose = () => {
        this.props.handleClose('remove')
    };

    handleSubmit = (callback) => {
        const { item } = this.props;
        callback({
            variables: {
                id: item._id
            }
        });
        this.handleClose()
    };

    render() {
        const { open, item, user, refetch, type } = this.props;
        if (!item) return null;
        const mutation = type === 'tileset' ? MutationList.REMOVE_TILESET : MutationList.REMOVE_PROJECT_PACK;
        const header = type === 'tileset' ? "Delete Tileset" : "Delete Project";
        const name = type === 'tileset' ? "Tileset" : "Project";
        const disabled = item.ownerInfo.username !== user.username
        return (
            <Mutation mutation={mutation} refetchQueries={[refetch]}>
                {(removeItem, res) => (
                    <Dialog
                        header={header}
                        open={open}
                        actions={[
                            <Button key='1' disabled={disabled} onClick={this.handleSubmit.bind(this, removeItem)}>Confirm</Button>,
                            <Button key='2' onClick={this.handleClose}>Cancel</Button>,
                        ]}
                        var totalTextbox='1'
                        content={
                            <section className="dialog_content" id="textBoxes">
                                <h3>Are You Sure to Delete This {name}?</h3>
                                <h3>This Can not be Undo, No Backup!</h3>
                                {disabled ? <p className='red'>You Are not the Owner. You cannot delete it!</p> : null}
                            </section>
                        } />
                )}
            </Mutation>
        )
    }
}

export default DeleteDialog