import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { fetchPlaylistWithID } from '../../actions/videosInPlaylist';

class VideosInPlaylist extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentWillMount() {
    const { match, fetchPlaylistWithIDAction, videoInPlaylistReducer } = this.props;
    if (!videoInPlaylistReducer.playlist) {
      fetchPlaylistWithIDAction(match.params.id);
    }
  }

  renderVideos() {
    const { videoInPlaylistReducer } = this.props;
    console.log(videoInPlaylistReducer);
    return (
      _.map(videoInPlaylistReducer.videos, el => (
        <div key={el._id}>{el.title}</div>
      ))
    );
  }

  render() {
    const { videoInPlaylistReducer } = this.props;
    console.log(videoInPlaylistReducer);
    if (!videoInPlaylistReducer) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        Title:
        {this.renderVideos()}
      </div>
    );
  }
}

VideosInPlaylist.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  fetchPlaylistWithIDAction: PropTypes.func.isRequired,
  videoInPlaylistReducer: PropTypes.shape({
    playlist: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

function mapReducerProps({ videoInPlaylistReducer }) {
  return { videoInPlaylistReducer };
}

const actions = {
  fetchPlaylistWithIDAction: fetchPlaylistWithID,
};

export default connect(mapReducerProps, actions)(VideosInPlaylist);
