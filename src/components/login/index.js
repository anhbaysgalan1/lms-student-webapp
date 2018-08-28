import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import mainLogo from '../../images/logo/logo.png';
import { login } from '../../actions/authAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChangeCheck = this.handleChangeCheck.bind(this);
    this.state = {
      loggingIn: false,
      username: '',
      password: '',
      clearErr: false,
      checkStatus: false,
    };
  }

  componentWillMount() {
    const dataStorage = JSON.parse(localStorage.getItem('rememberuser'));
    const checkedData = !!dataStorage;
    if (checkedData) {
      this.setState({
        username: dataStorage.username,
        // password: dataStorage.hashPassword,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loggingIn } = this.state;
    const { user, errMsg } = nextProps.loginReducer;
    if (!user && errMsg && loggingIn) {
      this.setState({
        loggingIn: false,
        clearErr: true,
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { username, password, checkStatus } = this.state;
    const { loginAction } = this.props;
    this.setState({
      loggingIn: true,
      clearErr: false,
    });
    loginAction(username, password, checkStatus);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleChangeCheck() {
    const { checkStatus } = this.state;
    if (!checkStatus) {
      this.setState({
        checkStatus: true,
      });
    } else {
      this.setState({
        checkStatus: false,
      });
    }
  }

  render() {
    const {
      username, password, loggingIn, clearErr, checkStatus,
    } = this.state;
    const { loginReducer } = this.props;
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-login">
        <div className="form-login">
          <div className="w-100 h-50 d-flex justify-content-center align-items-center">
            <img src={mainLogo} alt="mainLogo" />
          </div>
          <div className="w-100 h-50">
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleInputChange}
                  invalid={loginReducer.errMsg !== null}
                />
              </FormGroup>

              <FormGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  invalid={loginReducer.errMsg !== null}
                />
              </FormGroup>
              <div>
                {
              loginReducer.errMsg ? (
                <Input type="hidden" invalid />
              ) : ''
                }
                {clearErr ? (
                  <FormFeedback className="mb-3">
                    { loginReducer.errMsg || '' }
                  </FormFeedback>
                ) : ''}

                {
              loggingIn ? (
                <div className="d-flex justify-content-center">
                  {/* eslint-disable global-require */}
                  <img alt="" src={require('../../statics/loader.gif')} />
                  {/* eslint-enable global-require */}
                </div>
              ) : ''
            }
              </div>
              <div className="login">
                <Label check className="d-flex align-items-center justify-content-between">
                  <div className="remember-me">
                    <Input type="checkbox" checked={checkStatus} onChange={this.handleChangeCheck} />
                  </div>
                  {' '}
                  <div className="remember-me ml-1"> remember me </div>
                </Label>
                <Button className="button-login"> Log In </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginReducer: PropTypes.shape({
    user: PropTypes.object,
    errMsg: PropTypes.string,
  }).isRequired,
  loginAction: PropTypes.func.isRequired,
};

function mapReducerProps({ loginReducer }) {
  return { loginReducer };
}

const actions = {
  loginAction: login,
};

export default connect(mapReducerProps, actions)(Login);
