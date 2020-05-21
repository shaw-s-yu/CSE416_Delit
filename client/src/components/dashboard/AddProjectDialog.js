import React from 'react'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Dialog from '../tools/Dialog'

import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';
import QueryList from '../../graphql/Query'

class AddDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            tileWidth: 0,
            tileHeight: 0,
            width: 0,
            height: 0,
            disableBt: true,
        }
    }
    handleOnChange = (e) => {
        let { name, value } = e.target
        value = (name === 'itemName' ? value : parseInt(value) ? parseInt(value) : 0)
        // eslint-disable-next-line
        this.state[name] = value
        const { itemName, tileWidth, tileHeight, width, height } = this.state
        let disableBt
        if (itemName !== "" && tileWidth && tileHeight && width && height && tileWidth !== 0 && tileHeight !== 0 && width !== 0 && height !== 0)
            disableBt = false
        else
            disableBt = true
        this.setState({ [name]: value, disableBt })
    };

    handleAddProject = (callback) => {
        const { userId } = this.props
        const { itemName, width, height, tileWidth, tileHeight } = this.state
        callback({
            variables: {
                name: itemName,
                owner: userId,
                imageId: '5ec6f35e3e2ef01724dd7c3b',
                width: width,
                height: height,
                tileWidth: tileWidth,
                tileHeight: tileHeight
            }
        })
        this.props.handleClose()
    }

    render() {
        const { open, handleClose, refetch } = this.props;
        const { itemName, width, height, tileWidth, tileHeight, disableBt } = this.state
        const mutation = MutationList.CREATE_PROJECT_PACK
        const newRefetch = {
            ...refetch,
            query: QueryList.GET_MY_OWNED_PROJECTS
        }
        return (
            <Mutation mutation={mutation} refetchQueries={[newRefetch]} awaitRefetchQueries={false} onCompleted={() => {
                setTimeout(() => {
                    this.props.handleSelectSide('create')
                }, 500);
            }}>
                {(addItem, res) => {
                    return (
                        <Dialog
                            header='Create New Dialog'
                            open={open}
                            fullWidth={true}
                            maxWidth="xs"
                            actions={[
                                <Button variant="primary" size="sm" onClick={this.handleAddProject.bind(this, addItem)} key='1' disabled={disableBt}>Add</Button>,
                                <Button variant="primary" size="sm" key='2' onClick={handleClose.bind(this, 'cancel')}>Cancel</Button>
                            ]}
                            content={
                                <>
                                    <TextField
                                        className="add-project-dialog-input"
                                        label={`Enter New Project Name`}
                                        name="itemName"
                                        variant="outlined"
                                        size="small"
                                        value={itemName}
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
                                        value={tileWidth.toString()}
                                        onChange={this.handleOnChange}
                                    />

                                    <TextField
                                        className="project-property-input"
                                        label="Enter Tile Height"
                                        name="tileHeight"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={tileHeight.toString()}
                                        onChange={this.handleOnChange}
                                    />
                                    <div className='br'></div>
                                    <TextField
                                        className="project-property-input"
                                        label={`Enter Map Width (tiles)`}
                                        name="width"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={width.toString()}
                                        onChange={this.handleOnChange}
                                        helperText={`${width * tileWidth} x ${width * tileWidth} px`}
                                    />

                                    <TextField
                                        className="project-property-input"
                                        label={`Enter Map Height (tiles)`}
                                        name="height"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={height.toString()}
                                        onChange={this.handleOnChange}
                                        helperText={`${height * tileHeight} x ${height * tileHeight} px`}
                                    />
                                    {
                                        res.loading ? 'loading' : res.error ? res.error.message : null
                                    }
                                </>
                            } />
                    )
                }}
            </Mutation>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps)(AddDialog);