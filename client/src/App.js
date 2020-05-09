import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginScreen from './components/home/LoginScreen';
import RegisterScreen from './components/home/RegisterScreen';
import Dashboard from './components/dashboard/Dashboard';
import WorkScreen from './components/work/WorkScreen';
import DrawScreen from './components/draw/Draw'
import TilesetViewer from './components/draw/TilesetViewer'
import TestScreen from './components/test/TestScreen'
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
            <Route path="/register" component={RegisterScreen} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/project/:key' component={WorkScreen} />
            <Route path='/tileseteditor/:key' component={DrawScreen} />
            <Route path='/tilesetviewer/:key' component={TilesetViewer} />
            <Route path='/test' component={TestScreen} />
            <Route path="/:any" component={LoginScreen} />
          </Switch>
        </div>

      </BrowserRouter>

    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createSocket: () => dispatch(createSocketHandler()),
  }
}

export default connect(null, mapDispatchToProps)(App);
