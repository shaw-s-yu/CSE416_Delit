import React from 'react';
import './home_page.css'
import axios from 'axios'
import { Grid } from '@material-ui/core'

class HomeScreen extends React.Component {


    componentDidMount() {
        axios.get('/auth/current_user').then(res => {
            console.dir(res.data)
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
                            <a href="http://localhost:5000/auth/google">
                                <div className="login-btn-box" style={{ backgroundColor: '#db4a39' }} >
                                    <div className='login-btn-img'><i className="fab fa-google-plus-square login-btn-icon"></i></div>
                                    <div className='login-btn-context'>Sign In With Google</div>
                                </div>
                            </a>
                            <a href="http://localhost:5000/auth/facebook">
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

export default HomeScreen;
