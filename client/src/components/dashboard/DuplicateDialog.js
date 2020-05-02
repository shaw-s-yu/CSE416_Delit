import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import React from 'react'
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class DuplicateDialog extends React.Component {

    state = {
        name: ''
    }

    handleOnChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleSubmit = (callback) => {
        callback({
            variables: {
                id: this.props.project._id,
                name: this.state.name,
                owner: this.props.user._id
            }
        })
        this.props.handleClose('duplicate')
    }


    render() {

        const { open, project, refetch, handleClose } = this.props
        if (!project) return null
        return (
            <Mutation mutation={MutationList.DUPLICATE_PROJECT} refetchQueries={[refetch]}>
                {(duplicateProject, res) => (
                    <Dialog
                        header="Duplicate Project"
                        open={open}
                        actions={[
                            <Button key='1' onClick={this.handleSubmit.bind(this, duplicateProject)}>Enter</Button>,
                            <Button key='2' onClick={handleClose.bind(this, 'duplicate')}>Cancel</Button>,
                        ]}
                        content={
                            <>
                                <p>Everything will be copied</p>
                                <TextField
                                    className="form-control"
                                    label="Enter Project Name"
                                    type="name"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={project.name}
                                    onChange={this.handleOnChange}
                                />
                            </>
                        } />
                )}
            </Mutation>
        )
    }
}

export default DuplicateDialog