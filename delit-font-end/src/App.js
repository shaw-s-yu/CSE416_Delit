import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginScreen from './components/home/LoginScreen';
import logo from './img/Project_Logo.PNG';
import { createSocketHandler } from './store/database/HomeScreenHandler'


class App extends Component {

  UNSAFE_componentWillMount() {
    this.props.createSocket();
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginScreen} />
          </Switch>
        </div>
        <img className="delit-logo left" src={logo} alt="" ></img>
      </BrowserRouter>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSocket: () => dispatch(createSocketHandler())
  }
}

export default connect(null, mapDispatchToProps)(App);
