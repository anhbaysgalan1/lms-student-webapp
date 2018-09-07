import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { Col } from 'reactstrap';
import { fetchPlaylistWithID } from '../../actions/videosInPlaylist';
import './index1.css';
import thumbnail from '../../images/1.png';
import Loading from '../Loading/loading';

class VideosInPlaylist extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isLoading: true,
    };
  }

  componentWillMount() {
    const { match, fetchPlaylistWithIDAction, videoInPlaylistReducer } = this.props;
    if (!videoInPlaylistReducer.playlist) {
      fetchPlaylistWithIDAction(match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { videoInPlaylistReducer } = this.props;
    if (videoInPlaylistReducer !== nextProps.videoInPlaylistReducer) {
      this.setState({
        isLoading: false,
      });
    }
  }

  renderVideos() {
    const { videoInPlaylistReducer } = this.props;
    return (
      _.map(videoInPlaylistReducer.videos, el => (
        <Col md="4" className="playlist-item items-video" key={el._id}>
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <img className="fit_img" src={thumbnail} alt="thumbnails" />
            </div>
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
    const { isLoading } = this.state;
    const { videoInPlaylistReducer } = this.props;
    if (!videoInPlaylistReducer || isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <Loading />
        </div>
      );
    }
    return (
      <div className="playlists">
        <div className="playlist col-md-12">
          <div className="title">
            <h3>
              {videoInPlaylistReducer.title}
              {' '}
                Package
            </h3>
          </div>
          { videoInPlaylistReducer.videos.length <= 0 ? (
            <div className="mt-5 d-flex justify-content-center align-items-center">
              <h3 className="text-light">Nothing videos to show in this Package!</h3>
            </div>
          )
            : (
              <div className="playlist-list-videos row">
                {this.renderVideos()}
              </div>
            )
          }
        </div>
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
