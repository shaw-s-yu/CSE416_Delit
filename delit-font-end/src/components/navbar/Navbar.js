import React from 'react';
import { Link } from 'react-router-dom';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';

class Navbar extends React.Component {

    render() {
        const links = true ? <LoggedInLinks /> : <LoggedOutLinks />;
        return (
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to="/" className="brand-logo" >Home</Link>
                    {links}
                </div>
            </nav>
        );
    };
}

export default Navbar;