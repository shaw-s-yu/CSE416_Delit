import React from 'react'
import {Button} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import {v1} from "uuid";
// import Dialog from "../tools/Dialog";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { connect } from 'react-redux';
import gql from "graphql-tag";
import { Mutation } from 'react-apollo';

const ADD_PROJECT = gql`
    mutation AddProject(
            $name: String!,
            $owner: String!,
            $editors: [String],
        ){
            addProject(
            name: $name,
            owner: $owner,
            editors: $editors
            ){
                name
                owner
                editors
            }
        }
`;

class ProjectDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: "",
            tileWidth: "",
            tileHeight: "",
            mapWidth: "",
            mapHeight: "",
        }
    }

    submitAddProjectForm(e) {
        e.preventDefault();
        console.log(this.props);
        this.props.addProjectMutation({
           variables:{
               name: this.state.projectName,
               // owner: this.props.auth.
           }
        });
    }

    render() {
        let name, owner;
        const { project, handleClose } = this.props;
        console.log("auth:", this.props);
        return (
            <Mutation mutation={ADD_PROJECT}>
                {(addProject, {loading, error }) => (
                    <Dialog open={project} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <form onSubmit={e => {
                            e.preventDefault();
                            addProject({ variables: { name: this.state.projectName, owner: this.props.auth.user._id } });
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
                                    onChange={(e) => this.setState({projectName: e.target.value})}
                                    ref={node => { name = node; }}
                                />
                            </DialogContent>
                            <DialogActions>
                                <button as="input" variant="primary" size="sm" key='1' type="submit" >Add</button>
                                <Button variant="primary" size="sm" key='2' onClick={handleClose.bind(this, 'project')}>Cancel</Button>
                            </DialogActions>
                        </form>
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

{/*<Mutation mutation={ADD_PROJECT}>*/}
{/*    {(addProject, {loading, error }) => (*/}
{/*        <form onSubmit={e => {*/}
{/*            e.preventDefault();*/}
{/*            addProject({ variables: { name: name.value, owner: this.props.auth.user._id } });*/}
{/*            name.value = "";*/}
{/*            owner.value = "";*/}
{/*        }}>*/}
{/*            <Dialog*/}
{/*                header="Add Project"*/}
{/*                open={project}*/}
{/*                maxWidth="md"*/}
{/*                fullWidth={true}*/}
{/*                actions={[*/}
{/*                    <Button as="input" variant="primary" size="sm" key='1' type="submit" >Add</Button>,*/}
{/*                    <Button variant="primary" size="sm" key='2' onClick={handleClose.bind(this, 'project')}>Cancel</Button>*/}
{/*                ]}*/}
{/*                content={[*/}
{/*                    <TextField*/}
{/*                        className="dashboard-add-project"*/}
{/*                        label="Enter New Project Name"*/}
{/*                        type="name"*/}
{/*                        variant="outlined"*/}
{/*                        size="small"*/}
{/*                        key={v1()}*/}
{/*                        value={this.state.projectName}*/}
{/*                        onChange={(e) => this.setState({projectName: e.target.value})}*/}
{/*                    />,*/}
{/*                    <TextField*/}
{/*                        className="dashboard-add-project"*/}
{/*                        label="Enter New Project tile width"*/}
{/*                        variant="outlined"*/}
{/*                        size="small"*/}
{/*                        key={v1()}*/}
{/*                        value={this.state.tileWidth}*/}
{/*                        onChange={(e) => this.setState({tileWidth: e.target.value})}*/}
{/*                    />,*/}
{/*                    <TextField*/}
{/*                        className="dashboard-add-project"*/}
{/*                        label="Enter New Project tile height"*/}
{/*                        variant="outlined"*/}
{/*                        size="small"*/}
{/*                        key={v1()}*/}
{/*                        value={this.state.tileHeight}*/}
{/*                        onChange={(e) => this.setState({tileHeight: e.target.value})}*/}
{/*                    />,*/}
{/*                    <TextField*/}
{/*                        className="dashboard-add-project"*/}
{/*                        label="Enter New Project map width"*/}
{/*                        variant="outlined"*/}
{/*                        size="small"*/}
{/*                        key={v1()}*/}
{/*                        value={this.state.mapWidth}*/}
{/*                        onChange={(e) => this.setState({mapWidth: e.target.value})}*/}
{/*                    />,*/}
{/*                    <TextField*/}
{/*                        className="dashboard-add-project"*/}
{/*                        label="Enter New Project map height"*/}
{/*                        variant="outlined"*/}
{/*                        size="small"*/}
{/*                        key={v1()}*/}
{/*                        value={this.state.mapHeight}*/}
{/*                        onChange={(e) => this.setState({mapHeight: e.target.value})}*/}
{/*                    />]*/}
{/*                }*/}
{/*            />*/}
{/*        </form>*/}
{/*    )}*/}
{/*</Mutation>*/}