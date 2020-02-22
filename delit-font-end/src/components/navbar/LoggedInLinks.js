import React from 'react';
import { NavLink } from 'react-router-dom';

class LoggedInLinks extends React.Component {

    handleLogout = () => {

    }

    render() {
        return (
            <ul className="right">
                <li><NavLink to="/" onClick={this.handleLogout}>Log Out</NavLink></li>
                <li><NavLink to="/" className="btn btn-floating pink lighten-1"></NavLink></li>
            </ul>
        );
    };
}

export default LoggedInLinks;