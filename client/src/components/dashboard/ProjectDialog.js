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
import QueryList from '../../graphql/Query';

class ProjectDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            tileWidth: "",
            tileHeight: "",
            mapWidth: "",
            mapHeight: "",
            disableBt: true,
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
        const { project, handleClose } = this.props;
        const mutation = MutationList.ADD_PROJECT;
        const getProjectsQuery = QueryList.GET_PROJECTS;
        return (
            <Mutation mutation={mutation}>
                {(addProject, {loading, error }) => (
                    <Dialog open={project} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <form onSubmit={e => {
                            e.preventDefault();
                            addProject({
                                variables: {
                                    name: this.state.projectName, owner: this.props.auth.user._id
                                },
                                refetchQueries: [{query: getProjectsQuery}]
                            });
                            this.setState(  { projectName : "",
                                                    tileWidth : "",
                                                    tileHeight : "",
                                                    mapWidth : "",
                                                    mapHeight : "",
                            });
                        }}>
                            <DialogContent>
                                <TextField
                                    className="form-control"
                                    label="Enter New Project Name"
                                    type="name"
                                    name="name"
                                    variant="outlined"
                                    size="small"
                                    key={v1()}
                                    value={this.state.projectName}
                                    onChange={(e) => this.handleOnNameChange(e)}
                                />
                                <TextField
                                    className="form-control"
                                    label="Enter New Project Tile Width"
                                    type="tileWidth"
                                    name="tileWidth"
                                    variant="outlined"
                                    size="small"
                                    key={v1()}
                                    value={this.state.tileWidth}
                                    onChange={(e) => this.setState({tileWidth: e.target.value})}
                                />
                                <TextField
                                    className="form-control"
                                    label="Enter New Project Tile Height"
                                    type="tileHeight"
                                    name="tileHeight"
                                    variant="outlined"
                                    size="small"
                                    key={v1()}
                                    value={this.state.tileHeight}
                                    onChange={(e) => this.setState({tileHeight: e.target.value})}
                                />
                                <TextField
                                    className="form-control"
                                    label="Enter New Project Map Width"
                                    type="mapWidth"
                                    name="mapWidth"
                                    variant="outlined"
                                    size="small"
                                    key={v1()}
                                    value={this.state.mapWidth}
                                    onChange={(e) => this.setState({mapWidth: e.target.value})}
                                />
                                <TextField
                                    className="form-control"
                                    label="Enter New Project Map Height"
                                    type="mapHeight"
                                    name="mapHeight"
                                    variant="outlined"
                                    size="small"
                                    key={v1()}
                                    value={this.state.mapHeight}
                                    onChange={(e) => this.setState({mapHeight: e.target.value})}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="primary" size="sm" onClick={handleClose.bind(this, 'project')} key='1' type="submit" disabled={ this.state.disableBt }>Add</Button>
                                <Button variant="primary" size="sm" key='2' onClick={handleClose.bind(this, 'project')}>Cancel</Button>
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
        auth: state.auth
    }
};

export default connect(mapStateToProps)(ProjectDialog);