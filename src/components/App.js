import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { checkAuth, logout, loginRemember } from '../actions/authAction';
// import { ROUTE_STUDENT_LOGIN } from './routes';

import Login from './login';
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
    checkAuthAction();
    const dataStorage = JSON.parse(localStorage.getItem('rememberData'));
    const checkedData = !!dataStorage;
    if (checkedData) {
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
      if (user.role === 0) {
        return (
          // <Switch>
          //   <Route
          //     path={ROUTE_STUDENT_LOGIN}
          //     component={Login}
          //   />
          // </Switch>
          <div>
            Access Successfully!
            <button className="ml-2" type="button" onClick={this.logoutHandle}>
            Logout?
            </button>

          </div>

        );
      }
      return (
        <div>
          You havent permission to access this website!
          <button className="ml-2" type="button" onClick={this.logoutHandle}>
            Logout?
          </button>
        </div>
      );
    }
    return !autoLogin && user ? (
      <div className="d-flex justify-content-center">
        {/* eslint-disable global-require */}
        <img alt="" src={require('../statics/loader.gif')} />
        {/* eslint-enable global-require */}
      </div>
    ) : <Login />;
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
