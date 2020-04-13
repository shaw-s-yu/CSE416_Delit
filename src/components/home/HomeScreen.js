import React from 'react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import './home_page.css'
import axios from 'axios'


const screen = {
    LOGIN_SCREEN: "HOME_SCREEN",
    REGISTER_SCREEN: "REGISTER_SCREEN"
}


class HomeScreen extends React.Component {
    state = {
        currentScreen: screen.LOGIN_SCREEN,
    }

    handleGoRegister = () => {
        this.setState({ currentScreen: screen.REGISTER_SCREEN })
    }

    handleGoLogin = () => {
        this.setState({ currentScreen: screen.LOGIN_SCREEN })
    }



    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    componentDidMount() {
        axios.get('/auth/current_user').then(res => {
            console.log(res.data)
        })
    }


    getScreen = () => {
        switch (this.state.currentScreen) {
            case screen.LOGIN_SCREEN:
                return <LoginScreen handleGoRegister={this.handleGoRegister} />
            case screen.REGISTER_SCREEN:
                return <RegisterScreen handleGoLogin={this.handleGoLogin} />
            default:
                return <div>error</div>
        }
    }

    render() {

        return (

            <div className="home-page">
                {this.getScreen()}
            </div>


        );
    }

}

export default HomeScreen;
