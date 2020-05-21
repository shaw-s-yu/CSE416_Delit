import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import React from 'react'
import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';
import QueryList from '../../graphql/Query'


class DuplicateDialog extends React.Component {

    state = {
        name: this.props.item.name
    };

    handleOnChange = (e) => {
        this.setState({ name: e.target.value })
    };

    handleSubmit = (callback) => {
        callback({
            variables: {
                id: this.props.item._id,
                name: this.state.name,
                owner: this.props.user._id
            }
        });
    };


    render() {

        const { open, item, refetch, handleClose, type } = this.props;
        if (!item) return null;
        const mutation = type === 'tileset' ? MutationList.DUPLICATE_TILESET : MutationList.DUPLICATE_PROJECT;
        const label = type === 'tileset' ? "Enter Tileset Name" : "Enter Project Name";
        const newRefetch = {
            ...refetch,
            query: type === 'tileset' ? QueryList.GET_MY_OWNED_TILESETS : QueryList.GET_MY_OWNED_PROJECTS
        }
        return (
            <Mutation mutation={mutation} refetchQueries={[newRefetch]} onCompleted={() => {
                setTimeout(() => {
                    this.props.handleClose('duplicate')

                }, 200);
                setTimeout(() => {
                    this.props.handleSelectSide(type === 'tileset' ? 'tilesetsOwned' : 'create')
                }, 200);

            }
            }>
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
                                    label={label}
                                    type="name"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={item.name}
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