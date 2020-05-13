import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import React from 'react'
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class DownloadDialog extends React.Component {
    state = {
        checked: true,
    };

    handleOnChange = (e) => {
        this.setState({ checked: e.target.checked })
    };

    handleSubmit = (callback) => {
        this.props.handleClose('download')
    };


    render() {
        const { open, item, user, refetch,  handleClose } = this.props;
        const { checked } = this.state;
        if (!item) return null;
        const disabled = item.ownerInfo.username !== user.username;
        const mutation = MutationList.UPDATE_TILESET;
        return (
            <Mutation mutation={mutation} refetchQueries={[refetch]}>
                {(updateItem, res) => (
                    <Dialog
                        header={<>Download <span className={"header-item-name"} >{item.name}</span> Tileset</>}
                        open={open}
                        maxWidth={'xl'}
                        actions={[
                            <Button key='1' onClick={this.handleSubmit.bind(this, updateItem)} disabled={disabled}>Download Now!</Button>,
                            <Button key='2' onClick={handleClose.bind(this, 'download')}>Nah!</Button>,
                        ]}
                        // content={
                        //     <>
                        //         <label className="switch-btn-wrapper">
                        //             {checked ?
                        //                 <label htmlFor="switch-btn" className={"switch-btn-label download"}>Yes</label>
                        //                 :
                        //                 <label htmlFor="switch-btn" className={"switch-btn-label not-to-download"}>No</label>
                        //             }
                        //             <input type="checkbox" className="switch-btn" id="switch-btn" defaultChecked={true} onChange={this.handleOnChange}/>
                        //             <span className="switch-btn-slider round"/>
                        //         </label>

                        //     </>
                        // }
                    />
                )}
            </Mutation>
        )
    }

}

export default DownloadDialog;