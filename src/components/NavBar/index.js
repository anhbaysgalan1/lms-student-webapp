import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';
import { logout } from 'actions/authAction';
// import mainLogo from 'images/logo/logo.png';
import { withRouter } from 'react-router';
import SearchBar from '../SearchBar';
import { getInfoUser } from '../../actions/getInfoUser';


import './index.css';
import ModalProfile from './ModalProfile';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnOnModal: false,
    };
    this.logoutHandle = this.logoutHandle.bind(this);
    this.clickToProfile = this.clickToProfile.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const { getInfoUserAction } = this.props;
    getInfoUserAction();
  }

  logoutHandle() {
    const { logoutAction, history } = this.props;
    logoutAction();
    history.push('/');
  }

  toggle() {
    this.setState({
      turnOnModal: false,
    });
  }

  clickToProfile() {
    this.setState({
      turnOnModal: true,
    });
  }

  render() {
    const { loginReducer, showSearchBarReducer, getInfoUserReducer } = this.props;
    const { turnOnModal } = this.state;
    const { user } = loginReducer;
    return (
      <div>
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo/logo.png" alt="LMS logo" />
            </Link>
          </div>
          <div>
            {showSearchBarReducer ? <SearchBar /> : ''}
          </div>
          <div className="user">
            <div className="user-avatar" role="presentation" onClick={this.clickToProfile}>
              <img src="https://via.placeholder.com/150x150" alt="User avatar" />
            </div>
            <div className="user-info">
              <span className="username" role="presentation" onClick={this.clickToProfile}>{user && user.username ? user.username : ''}</span>
              <Button className="logout" onClick={this.logoutHandle}>Log out</Button>
            </div>
          </div>
        </nav>
        <ModalProfile
          {...this.props}
          infoUser={getInfoUserReducer}
          ToggleModal={turnOnModal}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

function mapReducerProps({ loginReducer, showSearchBarReducer, getInfoUserReducer }) {
  return { loginReducer, showSearchBarReducer, getInfoUserReducer };
}

const actions = {
  logoutAction: logout,
  getInfoUserAction: getInfoUser,
};

NavBar.defaultProps = {
  showSearchBarReducer: null,
};

NavBar.propTypes = {
  loginReducer: PropTypes.shape({
    user: PropTypes.object,
    errMsg: PropTypes.string,
  }).isRequired,
  showSearchBarReducer: PropTypes.bool,
  logoutAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(connect(mapReducerProps, actions)(NavBar));
