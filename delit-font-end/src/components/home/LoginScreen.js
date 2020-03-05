import React from 'react';
import { connect } from 'react-redux';
import { loginHandler, clearErrorHandler } from '../../store/database/HomeScreenHandler'
import { Redirect } from 'react-router-dom';
import { Button } from 'react-materialize';


class LoginScreen extends React.Component {

    state = {
        email: "",
        password: "",
        modelActive1: false,
        modelActive2: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state, this.props.socket);
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }


    goRegister = () => {
        this.props.clearError();
        this.props.handleGoRegister();
    }

    render() {
        const { email, password } = this.state;
        const { auth } = this.props;

        if (auth.email)
            return <Redirect to="/dashboard" />;

        return (
            <form onSubmit={this.handleSubmit} className="white login-form right">
                <h5 className="grey-text text-darken-3">Login</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input className="active" type="email" name="email" id="email" onChange={this.handleChange} value={email} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input className="active" type="password" name="password" id="password" onChange={this.handleChange} value={password} />
                </div>
                {auth.authError ? <div className="red-text center"><p>{auth.authError}</p></div> : null}
                <li className='login-link' onClick={this.goRegister}>New to Delit? sign up</li>
                <li className='login-link' onClick={this.props.handleModalOpen1}>Forget your password?</li>
                <div className="input-field">
                    <Button type="submit" waves='orange'>Login</Button>
                </div>
            </form>
        );
    };
}

const mapStateToProps = (state) => {
    console.log(state)
    const auth = state.auth;
    const socket = state.backend.socket
    return {
        auth: auth,
        socket: socket,
    }
};

const mapDispatchToProps = (dispatch) => ({
    login: (data, socket) => dispatch(loginHandler(data, socket)),
    clearError: () => dispatch(clearErrorHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);;