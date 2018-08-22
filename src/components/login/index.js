import React, { Component } from 'react';
import LoginForm from './login.form';

import mainLogo from '../../images/logo/logo.png';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log('abc');
  }

  render() {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-login">
        <div className="form-login">
          <div className="w-100 h-50 d-flex justify-content-center align-items-center">
            <img src={mainLogo} alt="mainLogo" />
          </div>
          <div className="w-100 h-50">
            <LoginForm
              onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
