import React from 'react';
import { connect } from 'react-redux';
import { registerHandler, clearErrorHandler } from '../../store/database/HomeScreenHandler'
import { Redirect } from 'react-router-dom';
import { Button, TextInput } from 'react-materialize';
import Dialog from '../modal/Dialog'

class RegisterScreen extends React.Component {

    state = {
        email: "",
        password: "",
        password2: "",
        modelActive1: false,
        modelActive2: false,
        vemail: "",
        vcode: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.register(this.state, this.props.socket)
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }

    goLogin = () => {
        this.props.clearError();
        this.props.handleGoLogin();
    }


    handleModalOpen1 = () => {
        this.setState({ modelActive1: true });
    }

    handleModalClose1 = () => {
        this.setState({ modelActive1: false });
    }

    handleModalOpen2 = () => {
        this.handleModalClose1();
        this.setState({ modelActive2: true });
    }

    handleModalClose2 = () => {
        this.setState({ modelActive2: false });
    }

    render() {
        const { email, password, password2, vemail, vcode } = this.state;
        const { auth } = this.props
        if (auth.email)
            return <Redirect to="/dashboard" />;
        return (
            <div className="white login-form right">
                <h5 className="grey-text text-darken-3">Sign up</h5>
                <TextInput label="Enter Your Email" id='email' value={email} onChange={this.handleChange} />
                <TextInput label="Enter Your Password" id='password' value={password} onChange={this.handleChange} />
                <TextInput label="Enter Your Password" id='password2' value={password2} onChange={this.handleChange} />
                {auth.authError ? <div className="red-text center"><p>{auth.authError}</p></div> : null}
                <li className='login-link' onClick={this.goLogin}>Already have account, go login</li>
                <Button waves='orange' onClick={this.handleModalOpen1}>Sign Up</Button>
                <Dialog
                    header="Verification"
                    open={this.state.modelActive1}
                    actions={[
                        <Button waves="orange" onClick={this.handleModalOpen2}>Submit</Button>,
                        <Button waves="orange" onClick={this.handleModalClose1}>Close</Button>
                    ]}
                    content={
                        <section className="dialog_content">
                            <p><strong>Please Enter Your Email</strong></p>
                            <p>We will send you a verification code</p>
                            <TextInput label="Enter Your Email" id='vemail' value={vemail}
                                onChange={this.handleChange} />
                        </section>
                    } />
                <Dialog
                    header="Verify Your Email"
                    open={this.state.modelActive2}
                    actions={[
                        <Button waves="orange" onClick={this.handleModalClose2}>Submit</Button>,
                        <Button waves="orange" onClick={this.handleModalClose2}>Close</Button>
                    ]}
                    content={
                        <section className="dialog_content">
                            <p><strong>We have sent you a verification code</strong></p>
                            <TextInput label="Enter Your Verification Code" id='vcode' value={vcode}
                                onChange={this.handleChange} />
                            <Button waves="orange" onClick={this.handleResend}> Resend <span style={{ color: "red" }}> (60s) </span></Button>
                        </section>
                    } />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    const auth = state.auth;
    const socket = state.backend.socket
    return {
        auth: auth,
        socket: socket,
    }
};

const mapDispatchToProps = (dispatch) => ({
    register: (data, socket) => dispatch(registerHandler(data, socket)),
    clearError: () => dispatch(clearErrorHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);;