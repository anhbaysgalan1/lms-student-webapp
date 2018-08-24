import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { checkAuth, logout } from '../actions/authAction';
// import { ROUTE_STUDENT_LOGIN } from './routes';

import Login from './login';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount() {
    const { checkAuthAction } = this.props;
    checkAuthAction();
  }

  render() {
    const { logoutAction, loginReducer } = this.props;
    const { user } = loginReducer;
    if (user) {
      if (user.role === 1) {
        return (
          // <Switch>
          //   <Route
          //     path={ROUTE_STUDENT_LOGIN}
          //     component={Login}
          //   />
          // </Switch>
          <div>
ASDA
            <button className="ml-2" type="button" onClick={logoutAction}>
            Logout?
            </button>

          </div>

        );
      }
      return (
        <div>
          You havent permission to access this website!
          <button className="ml-2" type="button" onClick={logoutAction}>
            Logout?
          </button>
        </div>
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
};

App.propTypes = {
  loginReducer: PropTypes.shape({
    user: PropTypes.object,
    errMsg: PropTypes.string,
  }).isRequired,
  logoutAction: PropTypes.func.isRequired,
  checkAuthAction: PropTypes.func.isRequired,
};

export default withRouter(connect(mapReducerProps, actions)(App));
