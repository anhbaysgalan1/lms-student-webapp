import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { checkAuth, logout, loginRemember } from 'actions/authAction';

import Login from './Login';
import Main from './Main';
import MainTeacher from './Teacher/Main';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      autoLogin: false,
    };
    this.logoutHandle = this.logoutHandle.bind(this);
  }

  componentWillMount() {
    const { checkAuthAction, loginAuto } = this.props;
    const { loginReducer } = this.props;
    const { user } = loginReducer;
    checkAuthAction();
    const dataStorage = JSON.parse(localStorage.getItem('rememberData'));
    const checkedData = !!dataStorage;
    if (checkedData && !user) {
      this.setState({
        autoLogin: true,
      });
      loginAuto(dataStorage.username, dataStorage.hashPassword);
    }
  }

  logoutHandle() {
    const { logoutAction } = this.props;
    this.setState({
      autoLogin: false,
    });
    logoutAction();
  }

  render() {
    const { autoLogin } = this.state;
    const { loginReducer } = this.props;
    const { user } = loginReducer;

    if ((user && autoLogin) || user) {
      if (user.role === 0) return <Main />;
      return (
        <MainTeacher />
      );
    }
    return <Login />;
  }
}

function mapReducerProps({ loginReducer }) {
  return { loginReducer };
}

const actions = {
  logoutAction: logout,
  checkAuthAction: checkAuth,
  loginAuto: loginRemember,
};

App.propTypes = {
  loginReducer: PropTypes.shape({
    user: PropTypes.object,
    errMsg: PropTypes.string,
  }).isRequired,
  logoutAction: PropTypes.func.isRequired,
  checkAuthAction: PropTypes.func.isRequired,
  loginAuto: PropTypes.func.isRequired,
};

export default withRouter(connect(mapReducerProps, actions)(App));
