import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar.js';
import logo from './img/Project_Logo.PNG';


class App extends Component {
  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
        </div>
        <img className="delit-logo right" src={logo} alt="" ></img>
      </BrowserRouter>

    );
  }
}

export default App;
