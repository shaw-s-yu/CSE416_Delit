import React from 'react'
import {Button} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import {v1} from "uuid";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';
import DialogTitle from "@material-ui/core/DialogTitle";

class UpdateProjectDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
        }
    }
    handleOnNameChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            this.setState( {projectName: value, disableBt : true});
        }else {
            this.setState( {projectName: value, disableBt : false});
        }
    };

    render() {

        const { open, handleClose, projectId, query, userId, pageSkip } = this.props;
        const mutation = MutationList.UPDATE_PROJECT;
        const name = this.state.projectName;
        // console.log("projectID:", this.props);
        return (
            <Mutation mutation={mutation}>
                {(updateProject, {loading, error }) => (
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle id="UpdateProject-dialog-title">Update Project</DialogTitle>
                        <form onSubmit={e => {
                            e.preventDefault();
                            updateProject({
                                variables: {
                                    id: projectId, name: name
                                },
                                refetchQueries: [{
                                    query: query,
                                    variables:{
                                        userId: userId,
                                        pageSkip:pageSkip}
                                }]
                            });
                            this.setState(  {
                                projectName : "",
                            });
                        }}>
                            <DialogContent>
                                <TextField
                                    className="form-control"
                                    label="Enter Project Name"
                                    type="name"
                                    name="name"
                                    variant="outlined"
                                    size="small"
                                    key={v1()}
                                    value={this.state.projectName}
                                    onChange={(e) => this.handleOnNameChange(e)}
                                />

                            </DialogContent>
                            <DialogActions>
                                <Button variant="primary" size="sm" onClick={handleClose.bind(this, 'rename')} key='1' type="submit" disabled={ this.state.disableBt }>Update</Button>
                                <Button variant="primary" size="sm" key='2' onClick={handleClose.bind(this, 'rename')}>Cancel</Button>
                            </DialogActions>
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again</p>}
                    </Dialog>
                )}
            </Mutation>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        pp: state
    }
};

export default connect(mapStateToProps)(UpdateProjectDialog);