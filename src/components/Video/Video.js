import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { Button, Col, Row } from 'reactstrap';
import { fetchPlaylistWithID } from '../../actions/videosInPlaylist';
import './index.css';

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
        <Col md="4" className="playlist-item" key={el._id}>
          <div>
            <div className="playlist-title">
              {el.title}
            </div>
            <div className="playlist-statics">
              <span className="playlist-views">
                <i className="far fa-eye" />
                {' '}
                  500
              </span>
              <span className="playlist-likes">
                <i className="far fa-heart" />
                {' '}
                  500
              </span>
            </div>
          </div>
        </Col>
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
