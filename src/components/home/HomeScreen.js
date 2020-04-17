import React from 'react';
import './home_page.css'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import config from '../../config'
import * as handler from '../../store/database/HomeScreenHandler';
const API_URL = config.server
class HomeScreen extends React.Component {


    openPopup = () => {
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/auth/google?socketId=${this.props.socket.id}`

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

    startAuth = () => {
        this.popup = this.openPopup()
        this.checkPopup()
    }


    componentDidMount() {
        this.props.socket.on('google', data => {
            const { err, msg, auth } = data
            if (err === false) {
                this.popup.close()
                this.props.handleLoginSuccess(auth)
                this.props.history.push('/dashboard/wefw')

            }
            else {
                this.popup.close()
                this.props.handleLoginError(msg)
            }
        })
    }


    render() {

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
                        <Grid

                        >
                            <div className="login-btn-box" style={{ backgroundColor: '#db4a39' }} onClick={this.startAuth}>
                                <div className='login-btn-img'><i className="fab fa-google-plus-square login-btn-icon"></i></div>
                                <div className='login-btn-context'>Sign In With Google</div>
                            </div>


                            <div className="login-btn-box" style={{ backgroundColor: '#3b5998' }}>
                                <div className='login-btn-img'><i className="fab fa-facebook login-btn-icon"></i></div>
                                <div className='login-btn-context'>Sign In With Facebook</div>
                            </div>

                        </Grid>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);;