import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';

import { logout } from 'actions/authAction';
import mainLogo from 'images/logo/logo.png';
import SearchBar from '../SearchBar';


import './index.css';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.logoutHandle = this.logoutHandle.bind(this);
  }

  logoutHandle() {
    const { logoutAction } = this.props;
    logoutAction();
  }

  render() {
    const { loginReducer, showSearchBarReducer } = this.props;
    const { user } = loginReducer;
    return (
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={mainLogo} alt="LMS logo" />
          </Link>
        </div>
        <div>
          {showSearchBarReducer ? <SearchBar /> : ''}
        </div>
        <div className="user">
          <div className="user-avatar">
            <img src="https://via.placeholder.com/150x150" alt="User avatar" />
          </div>
          <div className="user-info">
            <span className="username">{user && user.username ? user.username : ''}</span>
            <Button className="logout" onClick={this.logoutHandle}>Log out</Button>
          </div>
        </div>
      </nav>
    );
  }
}

function mapReducerProps({ loginReducer, showSearchBarReducer }) {
  return { loginReducer, showSearchBarReducer };
}

const actions = {
  logoutAction: logout,
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
};

export default connect(mapReducerProps, actions)(NavBar);
