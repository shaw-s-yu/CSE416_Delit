import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import SideNav from './SideNav'
import { Icon } from 'react-materialize'


class TopNavbar extends React.Component {



    render() {
        const { open } = this.props;
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand onClick={this.props.handleSidebarOpen} style={{ cursor: "pointer" }}><Icon>list</Icon></Navbar.Brand>
                    < Navbar.Brand href="/dashboard" > Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link>Team</Nav.Link>
                            <NavDropdown title="File" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Brand href="/">User</Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>
                <SideNav open={open} handleSidebarOpen={this.props.handleSidebarOpen} />
            </>
        )
    }

}

export default TopNavbar;
