import React from 'react';
import './home_page.css'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import { API_URL } from '../../config'
import axios from 'axios'
import * as handler from '../../store/database/HomeScreenHandler';

class LoginScreen extends React.Component {

    state = {
        err: null,
    }

    openPopup = (type) => {
        const width = 900, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/auth/${type}`

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


    componentDidMount() {
        console.log('running on:', API_URL)
        this.props.socket.on('authBack', data => {
            const { err, msg, auth } = data
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
    }


    UNSAFE_componentWillMount() {
        const { socket } = this.props
        socket.on('connect', () => {
            axios.get(`/auth/init?socketId=${socket.id}&type=login`).then(res => {
                console.log('set socket id:', res.data)
            })
        })
    }


    render() {

        const { err } = this.state
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
                            <div className="loginHeader2">Account Login</div>
                        </Grid>
                        <Grid>
                            <div className="login-btn-box google-enabled-btn" onClick={this.startAuth.bind(this, 'google')}>
                                <div className='login-btn-img'><i className="fab fa-google-plus-square login-btn-icon"></i></div>
                                <div className='login-btn-context'>Sign In With Google</div>
                            </div>
                            <div className="login-btn-box facebook-enabled-btn" onClick={this.startAuth.bind(this, 'facebook')}>
                                <div className='login-btn-img'><i className="fab fa-facebook login-btn-icon"></i></div>
                                <div className='login-btn-context'>Sign In With Facebook</div>
                            </div>
                            <p className="login-err">{err}</p>
                        </Grid>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >

                            <a href='/register' className="login-register-switch-text">New to Delit? Sign Up</a>
                        </Grid>
                    </Grid>
                </div>
            </div>


        );
    }

}

const mapStateToProps = (state, ownProps) => {
    const { history } = ownProps
    const { auth } = state
    return {
        history, auth,
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSuccess: (user) => dispatch(handler.loginSuccessHandler(user)),
    handleLoginError: (errmsg) => dispatch(handler.loginErrorHandler(errmsg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);;