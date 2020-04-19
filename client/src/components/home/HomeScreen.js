import React from 'react';
import './home_page.css'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import config from '../../config'
import * as handler from '../../store/database/HomeScreenHandler';
class HomeScreen extends React.Component {




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
                            <a href={`${config.server}/auth/google`}>
                                <div className="login-btn-box" style={{ backgroundColor: '#db4a39' }} onClick={this.startAuth}>
                                    <div className='login-btn-img'><i className="fab fa-google-plus-square login-btn-icon"></i></div>
                                    <div className='login-btn-context'>Sign In With Google</div>
                                </div>
                            </a>
                            <a href={`${config.server}/auth/facebook`}>
                                <div className="login-btn-box" style={{ backgroundColor: '#3b5998' }}>
                                    <div className='login-btn-img'><i className="fab fa-facebook login-btn-icon"></i></div>
                                    <div className='login-btn-context'>Sign In With Facebook</div>
                                </div>
                            </a>
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