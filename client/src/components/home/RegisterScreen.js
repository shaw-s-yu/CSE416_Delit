import React from 'react';
import './home_page.css'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import { API_URL } from '../../config'
import axios from 'axios'
import * as handler from '../../store/database/HomeScreenHandler';
import TextField from '@material-ui/core/TextField';

class RegisterScreen extends React.Component {

    state = {
        err: null,
        username: '',
        inputErr: true,
        inputErrMsg: '',
    }

    handleChange = (e) => {
        this.setState({ username: e.target.value })
        this.props.socket.emit('username_register', e.target.value)
    }

    openPopup = (type) => {
        const width = 900, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const { username } = this.state
        const url = `${API_URL}/auth/${type}?username=${username}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
        scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`
        )
    }

    checkPopup = () => {
        const check = setInterval(() => {
            if (this.popup.closed) {
                clearInterval(check)
            }
        }, 1000)
    }

    startAuth = (type) => {
        this.popup = this.openPopup(type)
        this.checkPopup()
    }

    getError = () => {
        const { inputErr, inputErrMsg } = this.state;
        if (inputErr === true && inputErrMsg === '')
            return ''
        if (inputErr === false && inputErrMsg === 'Good')
            return '👍 Username Available'
        if (inputErr === true)
            return '👎 ' + inputErrMsg
    }

    getSignUpButtonStyle = (type) => {
        const { inputErr } = this.state
        if (type === 'google')
            return inputErr ? 'disabled-btn' : 'google-enabled-btn'
        else
            return inputErr ? 'disabled-btn' : 'facebook-enabled-btn'
    }


    componentDidMount() {
        this.props.socket.on('authBack', data => {
            const { err, msg, auth } = data
            console.log(data)
            if (err === false && this.popup) {
                this.popup.close()
                this.props.handleLoginSuccess(auth)
                this.props.history.push('/dashboard')
            }
            else {
                this.popup.close()
                this.props.handleLoginError(msg)
                this.setState({ err: msg })
            }
        })
        this.props.socket.on('username_register_back', data => {
            const { err, msg } = data
            this.setState({ inputErr: err, inputErrMsg: msg })
        })
    }


    UNSAFE_componentWillMount() {
        const { socket } = this.props
        socket.on('connect', () => {
            axios.get(`/auth/init?socketId=${socket.id}&type=register`)
        })
    }


    render() {
        const { err, username, inputErr } = this.state

        return (

            <div className="home-page">
                <div className="login-form">
                    <Grid
                        container
                        direction="column"
                    >
                        <Grid>
                            <div className="grey-text text-darken-3">
                                <div className="loginHeader1">Delit</div>
                            </div>
                            <div className="loginHeader2">Account Sign Up</div>
                            <TextField error={inputErr}
                                id="outlined-basic"
                                className="username-entry-input"
                                label="Enter Your Prefered Username"
                                variant="outlined"
                                size="small"
                                helperText={this.getError()}
                                value={username}
                                onChange={this.handleChange} />
                        </Grid>
                        <Grid style={{ marginTop: 32 }}>
                            <div className={"login-btn-box " + this.getSignUpButtonStyle('google')} onClick={inputErr ? null : this.startAuth.bind(this, 'google')}>
                                <div className='login-btn-img'><i className="fab fa-google-plus-square login-btn-icon"></i></div>
                                <div className='login-btn-context'>Sign Up With Google</div>
                            </div>
                            <div className={"login-btn-box " + this.getSignUpButtonStyle('facebook')} onClick={inputErr ? null : this.startAuth.bind(this, 'facebook')} >
                                <div className='login-btn-img'><i className="fab fa-facebook login-btn-icon"></i></div>
                                <div className='login-btn-context'>Sign Up With Facebook</div>
                            </div>
                            <p className="login-err">{err}</p>
                        </Grid>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >
                            <a href='/' className="login-register-switch-text">Already Signed Up? Login</a>
                        </Grid>
                    </Grid>
                </div>
            </div>


        );
    }

}

const mapStateToProps = (state, ownProps) => {
    const { history } = ownProps
    return {
        history,
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSuccess: (user) => dispatch(handler.loginSuccessHandler(user)),
    handleLoginError: (errmsg) => dispatch(handler.loginErrorHandler(errmsg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);;