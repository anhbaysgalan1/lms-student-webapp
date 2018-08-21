import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        LMS Student
      </div>
    );
  }
}

const actions = {
};

App.propTypes = {
};

export default withRouter(connect(null, actions)(App));
