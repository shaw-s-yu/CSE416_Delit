import React from 'react';
import { Navbar, NavItem, Icon } from 'react-materialize'
import TopToolbar from './TopToolbar';


class TopNavbar extends React.Component {

    render() {
        return (
            <Navbar
                alignLinks="right"
                brand={<a className="brand-logo" href="#">Logo</a>}
                extendWith={
                    <TopToolbar />
                }
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
                <NavItem><div href="/dashboard">Back</div></NavItem>
                <NavItem href="components.html">User</NavItem>
            </Navbar>
        )
    }

}

export default TopNavbar;
