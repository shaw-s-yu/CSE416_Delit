import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Checkbox } from 'react-materialize'
class TopNavbar extends React.Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/dashboard">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="File" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Edit" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="View" id="basic-nav-dropdown">
                            <Checkbox label="Hide Property Window" value="property" id="property" />
                            <Checkbox label="Hide Layer Window" value="layer" id="layer" />
                            <Checkbox label="Hide Tileset Window" value="tileset" id="tileset" />
                        </NavDropdown>
                    </Nav>
                    <Navbar.Brand href="/">Logout</Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export default TopNavbar;
