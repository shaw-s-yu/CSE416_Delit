import React from 'react'
import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';


import { Mutation } from 'react-apollo';
import MutationList from '../../graphql/Mutation';

class InviteDialog extends React.Component {

    state = {
        input1: { text: '', able: true, err: false, msg: '', id: '' },
        input2: { text: '', able: false, err: false, msg: '', id: '' },
        input3: { text: '', able: false, err: false, msg: '', id: '' },
        input4: { text: '', able: false, err: false, msg: '', id: '' },
        input5: { text: '', able: false, err: false, msg: '', id: '' },
    }

    handleClose = () => {
        this.props.handleClose('invite')
    }

    handleOnChange = (e, input) => {
        let toEdit = this.state[input]
        toEdit.text = e.target.value
        this.setState({ [input]: toEdit })
        this.props.socket.emit('invite', {
            name: input,
            data: toEdit
        })
    }

    getMore = () => {
        const { input1, input2, input3, input4, input5 } = this.state
        if (input1.able && input2.able && input3.able && input4.able && input5.able)
            return true
        return false
    }

    handleDelete = (input) => {
        let toEdit = this.state[input]
        toEdit.text = ''
        toEdit.able = false;
        this.setState({ [input]: toEdit })
    }

    getTextField = (input) => {
        const { able, text, msg, err } = input
        if (!able) return null
        return (
            <div className='input-wrapper'>
                <TextField
                    error={err}
                    className="team-input"
                    label="Enter Username of Your Teamate"
                    name="projectName"
                    variant="outlined"
                    size="small"
                    value={text}
                    helperText={msg}
                    onChange={e => this.handleOnChange(e, 'input1')}
                />
                <i className="team-input-delete fas fa-trash-alt"
                    onClick={e => this.handleDelete('input1')}
                />
            </div>
        )

    }

    getTextFields = () => {
        const { input1, input2, input3, input4, input5 } = this.state
        const { item, user } = this.props
        const disabled = item.ownerInfo.username === user.username ? false : true
        if (disabled) return null

        return (
            <div className='inputs-wrapper'>
                {this.getTextField(input1)}
                {this.getTextField(input2)}
                {this.getTextField(input3)}
                {this.getTextField(input4)}
                {this.getTextField(input5)}
            </div>
        )

    }

    handleAddMore = () => {
        let { input1, input2, input3, input4, input5 } = this.state
        if (!input1.able) {
            input1.able = true
            this.setState({ input1 })
            return
        }
        if (!input2.able) {
            input2.able = true
            this.setState({ input2 })
            return
        }
        if (!input3.able) {
            input3.able = true
            this.setState({ input3 })
            return
        }
        if (!input4.able) {
            input4.able = true
            this.setState({ input4 })
            return
        }
        if (!input5.able) {
            input5.able = true
            this.setState({ input5 })
            return
        }
    }

    handleSubmit = (callback) => {
        const { input1, input2, input3, input4, input5 } = this.state
        const { _id } = this.props.item
        let usernames = []
        if (this.getSingleSubmit(input1)) usernames.push(this.getSingleSubmit(input1))
        if (this.getSingleSubmit(input2)) usernames.push(this.getSingleSubmit(input2))
        if (this.getSingleSubmit(input3)) usernames.push(this.getSingleSubmit(input3))
        if (this.getSingleSubmit(input4)) usernames.push(this.getSingleSubmit(input4))
        if (this.getSingleSubmit(input5)) usernames.push(this.getSingleSubmit(input5))
        callback({
            variables: {
                id: _id,
                users: usernames
            }
        })
        this.handleClose();
        this.props.handleClose('team')
    }

    getSingleSubmit = (input) => {
        const { id } = input
        if (id === '') return null
        return id
    }

    componentDidMount() {
        const { username } = this.props.user
        this.props.socket.on('inviteBack', res => {
            let { name, err, msg, req, id } = res
            let toEdit = this.state[name]
            const { teamInfo } = this.props.item
            let teammates = []
            teamInfo.forEach(e => {
                teammates.push(e.username)
            })
            if (teammates.includes(req)) {
                toEdit.err = true
                toEdit.msg = '👎 This User is already Your teammate'
                this.setState({ [name]: toEdit })
            }
            else if (username === req) {
                toEdit.err = true
                toEdit.msg = '👎 You can not invite Yourself'
                this.setState({ [name]: toEdit })
            } else {
                toEdit.err = err
                toEdit.msg = msg
                toEdit.id = id
                this.setState({ [name]: toEdit })
            }
        })
    }


    render() {
        const { open, item, user, refetch, selected } = this.props
        if (!item) return null
        const disabled = item.ownerInfo.username === user.username ? false : true
        const more = this.getMore()
        console.log("selected is ")
        console.log(selected)
        const mutation = selected === 'tileset' ? MutationList.INVITE_2TILESET : MutationList.INVITE_2PROJECT
        return (
            <Mutation mutation={mutation} refetchQueries={[refetch]}>
                {(inviteUser, res) => (
                    <Dialog
                        header="Invite Teammate"
                        open={open}
                        actions={[
                            <Button key='1' disabled={disabled} onClick={this.handleSubmit.bind(this, inviteUser)}>Submit</Button>,
                            <Button key='2' disabled={more || disabled} onClick={this.handleAddMore}>Add More</Button>,
                            <Button key='3' onClick={this.handleClose}>Close</Button>
                        ]}
                        content={
                            <section className="dialog_content" id="textBoxes">
                                <p><strong>Invite Your friend to work together</strong></p>
                                <p>they can view and edit, but not delete</p>
                                {disabled ? <p className='err-msg'>You are not the Owner, You cannot invite</p> : null}
                                {this.getTextFields()}
                            </section>
                        } />
                )}
            </Mutation>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(InviteDialog);;