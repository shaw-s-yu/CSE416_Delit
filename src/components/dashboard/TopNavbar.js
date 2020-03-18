import React from 'react';
import { Nav, Navbar } from 'react-bootstrap'
import SideNav from './SideNav'
import { Icon } from 'react-materialize'


class TopNavbar extends React.Component {



    render() {
        const { open } = this.props;
        return (
            <>
                <Navbar className="dashboard-top-navbar" bg="white" expand="lg">
                    <Navbar.Brand onClick={this.props.handleSidebarOpen} style={{ cursor: "pointer" }}><Icon>list</Icon></Navbar.Brand>
                    <Navbar.Brand href="/dashboard"> <div className="logo" >Delit</div></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Navbar.Brand href="/">Log Out</Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
                <SideNav open={open} handleSidebarOpen={this.props.handleSidebarOpen} />
            </>
        )
    }

}

export default TopNavbar;
