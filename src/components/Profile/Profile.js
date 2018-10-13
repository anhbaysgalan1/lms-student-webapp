import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScoreBoard from './ScoreBoard/ScoreBoard';
import ProfilePassword from './ProfilePassword/ProfilePassword';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { match } = this.props;
    if (match.params.id) {
      return <ScoreBoard idClass={match.params.id} />;
    }
    return <ProfilePassword />;
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};


export default Profile;
