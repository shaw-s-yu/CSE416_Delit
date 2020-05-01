import React from 'react'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { v1 } from "uuid";
import Dialog from '../tools/Dialog'

import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class AddProjectDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            tileWidth: 0,
            tileHeight: 0,
            mapWidth: 0,
            mapHeight: 0,
            disableBt: true,
        }
    }
    handleOnChange = (e) => {
        let { name, value } = e.target
        value = name === 'projectName' ? value : parseInt(value) ? parseInt(value) : 0
        this.state[name] = value
        const { projectName, tileWidth, tileHeight, mapWidth, mapHeight } = this.state
        let disableBt
        if (projectName !== "" && tileWidth && tileHeight && mapWidth && mapHeight && tileWidth !== 0 && tileHeight !== 0 && mapWidth !== 0 && mapHeight !== 0)
            disableBt = false
        else
            disableBt = true
        this.setState({ [name]: value, disableBt })
    };

    handleAddProject = (callback) => {
        callback()
        this.props.handleClose()
    }

    render() {
        const { open, handleClose, refetch } = this.props;
        const { projectName, mapWidth, mapHeight, tileWidth, tileHeight, disableBt } = this.state

        return (
            <Mutation mutation={MutationList.ADD_PROJECT} refetchQueries={[refetch]}>
                {(addProject, res) => (
                    <Dialog
                        header='Create New Dialog'
                        open={open}
                        fullWidth={true}
                        maxWidth="xs"
                        actions={[
                            <Button variant="primary" size="sm" onClick={this.handleAddProject.bind(this, addProject)} key='1' disabled={disableBt}>Add</Button>,
                            <Button variant="primary" size="sm" key='2' onClick={handleClose}>Cancel</Button>
                        ]}
                        content={
                            <>
                                <TextField
                                    className="add-project-dialog-input"
                                    label="Enter New Project Name"
                                    name="projectName"
                                    variant="outlined"
                                    size="small"
                                    value={projectName}
                                    onChange={this.handleOnChange}
                                />
                                <div className='br'></div>
                                <TextField
                                    className="project-property-input"
                                    label="Enter Tile Width"
                                    name="tileWidth"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    value={tileWidth}
                                    onChange={this.handleOnChange}
                                />

                                <TextField
                                    className="project-property-input"
                                    label="Enter Tile Height"
                                    name="tileHeight"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    value={tileHeight}
                                    onChange={this.handleOnChange}
                                />
                                <div className='br'></div>
                                <TextField
                                    className="project-property-input"
                                    label="Enter Map Width"
                                    name="mapWidth"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    value={mapWidth}
                                    onChange={this.handleOnChange}
                                />

                                <TextField
                                    className="project-property-input"
                                    label="Enter Map Height"
                                    name="mapHeight"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    value={mapHeight}
                                    onChange={this.handleOnChange}
                                />
                                {
                                    res.loading ? 'loading' : res.error ? res.error.message : null
                                }
                            </>
                        } />
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

export default connect(mapStateToProps)(AddProjectDialog);