import React from "react";
import { Rnd } from 'react-rnd';
import Titlebar from '../tools/Titlebar'
import TextField from '@material-ui/core/TextField';
import { Button } from "react-bootstrap";


class ChatBox extends React.Component {

    state = {
        inputText: '',
        chatHistory: [],
        position: { x: 100, y: 100 },
        size: { width: 320, height: 480 }
    }

    handleSubmit = () => {

        this.props.socket.emit('chat', {
            username: this.props.username,
            userPicture: this.props.userPicture,
            msg: this.state.inputText,
            room: this.props.room
        })
        this.setState({ inputText: '' })
    }

    handleChange = e => {
        this.setState({ inputText: e.target.value })
    }

    handleStopResize = (e, direction, ref, delta, position) => {
        this.setState({
            size: {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height)
            }
        })
    }

    handleOnDragStop = (e, d) => {
        this.setState({ position: { x: d.x, y: d.y } })
    }

    handleResetWindow = () => {
        this.setState({
            position: { x: 100, y: 100 },
            size: { width: 320, height: 480 }
        })
    }

    handleMaxWindow = () => {
        const { width, height } = document.body.getBoundingClientRect();
        this.setState({
            position: { x: 0, y: 0 },
            size: { width: width, height: height }
        })
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
        const { inputText, chatHistory, size, position } = this.state
        const currentUser = this.props.username
        return (
            <>
                {open ? <Rnd
                    size={size}
                    position={position}
                    className={'chat-box '}
                    onResizeStop={this.handleStopResize}
                    onDragStop={this.handleOnDragStop}
                >
                    <Titlebar title="Property Window" handleClose={this.props.handleClose} handleResetWindow={this.handleResetWindow} handleMaxWindow={this.handleMaxWindow} />
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

                </Rnd> : null}

            </>
        )
    }
}

export default ChatBox