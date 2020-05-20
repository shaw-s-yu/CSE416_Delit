import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import React from 'react'
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class PublishDialog extends React.Component {
    state = {
        checked: this.props.item.published,
    };

    handleOnChange = (e) => {
        this.setState({ checked: e.target.checked })
    };

    handleSubmit = (callback) => {
        callback({
            variables: {
                id: this.props.item._id,
                published: this.state.checked
            }
        })
        this.props.handleClose('publish')
    };


    render() {
        const { open, item, user, refetch,  handleClose } = this.props;
        const { checked } = this.state;
        if (!item) return null;
        const disabled = item.ownerInfo.username !== user.username;
        const mutation = MutationList.PUBLISH_TILESET;
        return (
            <Mutation mutation={mutation} refetchQueries={[refetch]}>
                {(updateItem, res) => (
                    <Dialog
                        header={<>Publish <span className={"header-item-name"} >{item.name}</span> Tileset</>}
                        open={open}
                        maxWidth={'xl'}
                        actions={[
                            <Button key='1' onClick={this.handleSubmit.bind(this, updateItem)} disabled={disabled}>Enter</Button>,
                            <Button key='2' onClick={handleClose.bind(this, 'publish')}>Cancel</Button>,
                        ]}
                        content={
                            <>
                                <label className="switch-btn-wrapper">
                                    {checked ?
                                        <label htmlFor="switch-btn" className={"switch-btn-label publish"}>Yes</label>
                                        :
                                        <label htmlFor="switch-btn" className={"switch-btn-label not-to-publish"}>No</label>
                                    }
                                    <input type="checkbox" className="switch-btn" id="switch-btn" defaultChecked={item.published} onChange={this.handleOnChange}/>
                                    <span className="switch-btn-slider round"/>
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