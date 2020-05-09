import React from 'react'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Dialog from '../tools/Dialog'

import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

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
        const { userId, } = this.props
        const { itemName, width, height, tileWidth, tileHeight } = this.state

        callback({
            variables: {
                name: itemName,
                owner: userId,
                width: parseInt(width),
                height: parseInt(height),
                tileWidth: parseInt(tileWidth),
                tileHeight: parseInt(tileHeight),
                imageId: '5eacb076d0ed064dec138c41'
            }
        })

        this.props.handleClose()
    }

    render() {
        const { open, handleClose, refetch } = this.props;
        const { itemName, width, height, tileWidth, tileHeight, disableBt } = this.state
        const mutation = MutationList.ADD_TILESET
        return (
            <Mutation mutation={mutation} refetchQueries={[refetch]}>
                {(addItem, res) => (
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
                                    label={`Enter New Tileset Name`}
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
                                    label={`Enter Image Width`}
                                    name="width"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    value={width.toString()}
                                    onChange={this.handleOnChange}
                                />

                                <TextField
                                    className="project-property-input"
                                    label={`Enter Image Height`}
                                    name="height"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    value={height.toString()}
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
    }
};

export default connect(mapStateToProps)(AddDialog);