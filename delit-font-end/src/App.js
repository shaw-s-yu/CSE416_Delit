import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeScreen from './components/home/HomeScreen';
import Dashboard from './components/dashboard/Dashboard';
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
            <Route exact path="/" component={HomeScreen} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path="/:any" component={HomeScreen} />
          </Switch>
        </div>

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
