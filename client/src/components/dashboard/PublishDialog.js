import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import React from 'react'
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class PublishDialog extends React.Component {
    state = {
        checked: true,
    };

    handleOnChange = (e) => {
        this.setState({ checked: e.target.value })
    };

    handleSubmit = (callback) => {
        // callback({
        //     variables: {
        //         id: this.props.item._id,
        //         name: this.state.name === '' ? this.props.item.name : this.state.name
        //     }
        // });
        this.props.handleClose('publish')
    };


    render() {
        const { open, item, user, refetch,  type } = this.props;
        if (!item) return null;
        const disabled = item.ownerInfo.username !== user.username;
        const mutation = MutationList.UPDATE_TILESET;
        return (
            <Mutation mutation={mutation} refetchQueries={[refetch]}>
                {(updateItem, res) => (
                    <Dialog
                        header={"Publish Tileset"}
                        open={open}
                        actions={[
                            <Button key='1' onClick={this.handleSubmit.bind(this, updateItem)} disabled={disabled}>Enter</Button>,
                        ]}
                        content={
                            <>
                                <label className="switch-btn-wrapper">
                                    <input type="checkbox" onChange={this.handleOnChange}/>
                                    <span className="to-publish">Publish</span>
                                    <span className="not-to-publish">Not to Publish</span>
                                </label>

                            </>
                        }
                    />
                )}
            </Mutation>
        )
    }

}

export default PublishDialog;