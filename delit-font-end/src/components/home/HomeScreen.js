import React from 'react';
import { Button, Modal, TextInput } from 'react-materialize';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import logo from '../../img/Project_Logo.PNG';


const screen = {
    LOGIN_SCREEN: "HOME_SCREEN",
    REGISTER_SCREEN: "REGISTER_SCREEN"
}


class HomeScreen extends React.Component {
    state = {
        currentScreen: screen.LOGIN_SCREEN,
        modelActive1: false,
        modelActive2: false,
        vemail: "",
        vcode: "",
        vpass: "",
        vpass2: "",
    }

    handleGoRegister = () => {
        this.setState({ currentScreen: screen.REGISTER_SCREEN })
    }

    handleGoLogin = () => {
        this.setState({ currentScreen: screen.LOGIN_SCREEN })
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

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
    }


    getScreen = () => {
        switch (this.state.currentScreen) {
            case screen.LOGIN_SCREEN:
                return <LoginScreen
                    handleModalOpen1={this.handleModalOpen1}
                    handleModalOpen2={this.handleModalOpen2}
                    handleModalClose1={this.handleModalClose1}
                    handleModalClose2={this.handleModalClose2}
                    handleGoRegister={this.handleGoRegister} />
            case screen.REGISTER_SCREEN:
                return <RegisterScreen
                    handleModalOpen1={this.handleModalOpen1}
                    handleModalOpen2={this.handleModalOpen2}
                    handleModalClose1={this.handleModalClose1}
                    handleModalClose2={this.handleModalClose2}
                    handleGoLogin={this.handleGoLogin} />
            default:
                return <div>error</div>
        }
    }

    render() {

        return (

            <div className="home-page">
                <img className="delit-logo left" src={logo} alt="" ></img>
                {
                    this.getScreen()
                }

                <Modal
                    bottomSheet={false}
                    fixedFooter={false}
                    header="Verification"
                    open={this.state.modelActive1}
                    style={{ maxHeight: 'none' }}
                    options={{
                        dismissible: false,
                        endingTop: '10%',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        opacity: 0.5,
                        outDuration: 250,
                        preventScrolling: false,
                        startingTop: '4%'
                    }}
                >
                    <section className="dialog_content">
                        <p><strong>Please Enter Your Email</strong></p>
                        <p>We will send you a verification code</p>
                        <TextInput placeholder="Enter Your Email" id='vemail' value={this.state.vemail}
                            onChange={this.handleChange} />
                    </section>
                    <Button waves="orange" onClick={this.handleModalOpen2}>Submit</Button>
                    <Button waves="orange" onClick={this.handleModalClose1}>Close</Button>
                </Modal>
                <Modal
                    bottomSheet={false}
                    fixedFooter={false}
                    header="Reset Password"
                    open={this.state.modelActive2}
                    style={{ maxHeight: 'none' }}
                    options={{
                        dismissible: false,
                        endingTop: '10%',
                        inDuration: 250,
                        onCloseEnd: null,
                        onCloseStart: null,
                        onOpenEnd: null,
                        onOpenStart: null,
                        opacity: 0.5,
                        outDuration: 250,
                        preventScrolling: false,
                        startingTop: '4%'
                    }}
                >
                    <section className="dialog_content">
                        <p><strong>We have sent you a verification code</strong></p>
                        <TextInput placeholder="Enter Your Verification Code" id='vcode' value={this.state.vcode}
                            onChange={this.handleChange} />
                        <Button waves="orange" onClick={this.handleResend}> Resend <span style={{ color: "red" }}> (60s) </span></Button>
                        <p><strong>Password</strong></p>
                        <TextInput placeholder="Enter Your New Password" id='vpass' value={this.state.vpass}
                            onChange={this.handleChange} />
                        <p><strong>Password</strong></p>
                        <TextInput placeholder="Confirm Your New Password" id='vpass2' value={this.state.vpass2}
                            onChange={this.handleChange} />
                    </section>
                    <Button waves="orange" onClick={this.handleModalClose2}>Submit</Button>
                    <Button waves="orange" onClick={this.handleModalClose2}>Close</Button>
                </Modal>
            </div>


        );
    }

}

export default HomeScreen;
