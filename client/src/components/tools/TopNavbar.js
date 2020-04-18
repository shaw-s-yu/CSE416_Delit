import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import SideNav from '../dashboard/SideNav'
import Dropdown from './Dropdown'
import { v1 } from 'uuid'
import Checkbox from '@material-ui/core/Checkbox';
import * as handler from '../../store/database/HomeScreenHandler';
import './tools.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'

class TopNavbar extends React.Component {


    componentDidMount() {
        this.props.socket.on('connect', () => {
            axios.get(`/auth/current_user?socketId=${this.props.socket.id}`)
        })
    }

    componentWillMount() {
        this.props.socket.on('google', data => {
            console.log('google returned')
            const { err, msg, auth } = data
            if (err === false) {
                this.props.handleLoginSuccess(auth)
            }
            else {
                this.props.handleLoginError(msg)
            }
        })
    }

    render() {
        const { open, side, view, propertyOpen, layerOpen, tilesetOpen, handleWindowOpen, auth } = this.props;
        console.log(auth)
        if (auth.errmsg === 'no log in')
            return <Redirect to='/' />

        if (auth.user === null)
            return 'loading....';

        const { username, picture } = auth.user
        return (
            <>
                <Navbar className="dashboard-top-navbar" bg="white" expand="lg">
                    {side ? <Navbar.Brand onClick={this.props.handleSidebarOpen} style={{ cursor: "pointer" }}><i className="fas fa-list list-icon"></i></Navbar.Brand> : null}
                    <Navbar.Brand href="/dashboard"> <div className="logo" >Delit</div></Navbar.Brand>
                    {!side ? <>
                        <Dropdown title="FILE" width={96} handleOpen={this.handleOpen}
                            items={[
                                <div className="better-dropdown-item" key={v1()}>Import</div>,
                                <div className="better-dropdown-item" key={v1()}>Export</div>,
                                <div className="better-dropdown-item" key={v1()}>Save</div>,
                                <div className="better-dropdown-item" key={v1()}>Duplicate</div>,
                            ]} />
                        <Dropdown title="EDIT" width={128} handleOpen={this.handleOpen}
                            items={[
                                <div className="better-dropdown-item" key={v1()}>{"Undo   CTRL+Z"}</div>,
                                <div className="better-dropdown-item" key={v1()}>{"Redo   CTRL+Y"}</div>,
                                <div className="better-dropdown-item" key={v1()}>{"Copy   CTRL+C"}</div>,
                                <div className="better-dropdown-item" key={v1()}>{"Paste  CTRL+V"}</div>,
                            ]} />
                        {view ? <Dropdown title="VIEW" width={174} handleOpen={this.handleOpen}
                            items={[
                                <div className="better-dropdown-item" key={v1()} style={{ paddingLeft: 0 }} onClick={e => handleWindowOpen(e, 'property')}>
                                    <Checkbox
                                        checked={propertyOpen}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                Show Property Window
                            </div>,
                                <div className="better-dropdown-item" key={v1()} style={{ paddingLeft: 0 }} onClick={e => handleWindowOpen(e, 'layer')}>
                                    <Checkbox
                                        checked={layerOpen}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                Show Layer Window
                            </div>,
                                <div className="better-dropdown-item" key={v1()} style={{ paddingLeft: 0 }} onClick={e => handleWindowOpen(e, 'tileset')}>
                                    <Checkbox
                                        checked={tilesetOpen}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                Show Tileset Window
                            </div>,
                            ]} /> : null}
                    </> : null}

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Navbar.Brand><img src={picture} className="profile-img" alt="delit-profile-logo"></img></Navbar.Brand>
                        <Navbar.Brand>{username}</Navbar.Brand>
                        <Navbar.Brand href={`${config.server}/auth/logout`} >Log Out</Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
                {side ? <SideNav open={open} handleSidebarOpen={this.props.handleSidebarOpen} /> : null}
            </>
        )
    }

}
const mapStateToProps = (state) => {
    const { auth } = state
    return {
        auth,
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSuccess: (user) => dispatch(handler.loginSuccessHandler(user)),
    handleLoginError: (errmsg) => dispatch(handler.loginErrorHandler(errmsg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar)
