import React from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize'


class TopNavbar extends React.Component {

    render() {
        return (
            <Navbar
                alignLinks="right"
                brand={<a className="brand-logo" href="/">Logo</a>}
                menuIcon={<Icon>menu</Icon>}
                options={{
                    draggable: true,
                    edge: 'left',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true
                }}
            >
                <NavItem>User</NavItem>
                <NavItem>User</NavItem>
            </Navbar>
        )
    }

}

export default TopNavbar;
