import React from 'react';
import { connect } from 'react-redux';
import { loginHandler } from '../../store/database/HomeScreenHandler'


class LoginScreen extends React.Component {

    state = {
        email: "sss",
        password: "sss",
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state, this.props.socket);
    }

    handleChange = (e) => {

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="white login-form right">
                <h5 className="grey-text text-darken-3">Login</h5>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input className="active" type="email" name="email" id="email" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input className="active" type="password" name="password" id="password" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0">Login</button>
                </div>
            </form>
        );
    };
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        socket: state.socket,
    }
};

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(loginHandler(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);;