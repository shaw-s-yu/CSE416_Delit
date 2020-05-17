import React from "react";
import { Rnd } from 'react-rnd';
import Titlebar from '../tools/Titlebar'
import TextField from '@material-ui/core/TextField';
import { Button } from "react-bootstrap";


class ChatBox extends React.Component {

    state = {
        inputText: '',
        chatHistory: []
    }

    handleSubmit = () => {
        this.setState({ inputText: '' }, () => {
            this.props.socket.emit('chat', {
                username: this.props.username,
                userPicture: this.props.userPicture,
                msg: this.state.inputText,
                room: this.props.room
            })
        })
    }

    handleChange = e => {
        this.setState({ inputText: e.target.value })
    }

    UNSAFE_componentWillMount() {
        this.props.socket.on('chat-back', res => {
            let chatHistory = this.state.chatHistory.map(e => ({ ...e }))
            chatHistory.push(res)
            this.setState({ chatHistory })
        })
    }

    render() {
        const { open } = this.props
        const { inputText, chatHistory } = this.state
        const currentUser = this.props.username
        return (
            <>
                <Rnd
                    default={{
                        x: 0,
                        y: 100,
                        width: 320,
                        height: 480,
                    }}
                    className={'chat-box ' + (open ? '' : 'invisible')}
                >
                    <Titlebar title="Property Window" />
                    <h3 style={{ textAlign: 'center' }}>chat</h3>
                    <div className='chat-history'>
                        {
                            chatHistory.map((e, index) => {
                                const { username, userPicture, msg } = e
                                return (
                                    <div key={index} className='chat-history-item-box'>
                                        <img src={userPicture} alt='' className={currentUser === username ? 'chat-history-item-picture-right' : 'chat-history-item-picture'}></img>
                                        <div className={currentUser === username ? 'chat-history-item-username-right' : 'chat-history-item-username'}>{username}</div>
                                        <div className={currentUser === username ? 'chat-history-item-msg-right' : 'chat-history-item-msg'}>{msg}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <TextField
                        id="outlined-basic"
                        className="chat-input"
                        label="Enter Message"
                        variant="outlined"
                        size="small"
                        value={inputText}
                        onClick={e => e.stopPropagation()}
                        onChange={this.handleChange} />
                    <Button className='chat-input-btn' size="sm" onClick={this.handleSubmit}>&#10148;</Button>

                </Rnd>
            </>
        )
    }
}

export default ChatBox