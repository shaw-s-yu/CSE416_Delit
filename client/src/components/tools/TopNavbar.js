import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import SideNav from '../dashboard/SideNav'
import Dropdown from './Dropdown'
import { v1 } from 'uuid'
import Checkbox from '@material-ui/core/Checkbox';
import * as handler from '../../store/database/HomeScreenHandler';
import './tools.css'
import { connect } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../config'

class TopNavbar extends React.Component {

    state = {
        username: 'error',
        picture: 'error'
    }


    componentDidMount() {
        axios.get('/auth/current').then(res => {
            const { username, picture } = res.data
            if (!username || !picture)
                this.props.history.push('/')
            else {
                this.setState({ username, picture })
                this.props.handleLoginSuccess(res.data)
            }
        })
    }

    UNSAFE_componentWillMount() {
        const { hash } = this.props.history.location
        if (hash === "#_=_")
            this.props.history.push('/dashboard')
    }

    render() {
        const { open, side, view, propertyOpen, layerOpen, tilesetOpen, handleWindowOpen } = this.props;
        const { username, picture } = this.state
        return (
            <>
                <Navbar className="dashboard-top-navbar" bg="white" expand="lg">
                    {side ? <Navbar.Brand onClick={this.props.handleSidebarOpen} style={{ cursor: "pointer" }}><i className="fas fa-list"></i></Navbar.Brand> : null}
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
                        {view ? <Dropdown title="VIEW" width={196} handleOpen={this.handleOpen}
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
                        <Navbar.Brand><a href='/test'>Test</a></Navbar.Brand>
                        <Navbar.Brand><img src={picture} className="profile-img" alt="delit-profile-logo"></img></Navbar.Brand>
                        <Navbar.Brand>{username}</Navbar.Brand>
                        <Navbar.Brand href={`${API_URL}/auth/logout`} >Log Out</Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
                {side ? <SideNav open={open} handleSidebarOpen={this.props.handleSidebarOpen} /> : null}
            </>
        )
    }

}
const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    handleLoginSuccess: (user) => dispatch(handler.loginSuccessHandler(user)),
    handleLoginError: (errmsg) => dispatch(handler.loginErrorHandler(errmsg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar)
