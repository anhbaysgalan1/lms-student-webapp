import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import { ROUTE_STUDENT_LOGIN } from './routes';

import Login from './login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <Switch>
        <Route
          path={ROUTE_STUDENT_LOGIN}
          component={Login}
        />
      </Switch>
    );
  }
}

const actions = {
};

App.propTypes = {
};

export default withRouter(connect(null, actions)(App));
