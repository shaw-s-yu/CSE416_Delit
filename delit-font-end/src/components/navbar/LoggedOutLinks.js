import React from 'react';
import { NavLink } from 'react-router-dom';

class LoggedOutLinks extends React.Component {
    handleRegister = () => {

    }
    render() {
        return (
            <ul className="right" >
                <li><NavLink to="/" onClick={this.handleRegister} >Register</NavLink></li>
            </ul>
        );
    }
}

export default LoggedOutLinks;