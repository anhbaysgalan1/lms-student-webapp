import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { hideSearchBar } from '../../actions/showSearchbar';
import { fetchPlaylistWithID, getCurrentVideo, clearCurrentVideo } from '../../actions/videosInPlaylist';
import Loading from '../Loading/loading';
import FrameYouTube from './FrameYoutube/FrameYoutube';

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      videoActive: null,
    };
    this.renderList = this.renderList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const {
      match,
      fetchPlaylistWithIDAction,
      hideSearchBarAction,
      getCurrentVideoAction,
      videoInPlaylistReducer,
    } = this.props;
    if (_.isEqual(videoInPlaylistReducer, {})) {
      fetchPlaylistWithIDAction(match.params.id);
    }
    hideSearchBarAction();
    getCurrentVideoAction(match.params.video);
  }

  handleClick(index, video) {
    const { history, getCurrentVideoAction } = this.props;
    this.setState({
      videoActive: index,
    });
    getCurrentVideoAction(video._id);
    // clearCurrentVideoAction();
    history.push(`${video._id}`);
  }

  renderList() {
    const { videoInPlaylistReducer, currentVideoReducer } = this.props;
    const { videoActive } = this.state;
    const { videoId: CurrentId } = currentVideoReducer;
    if (videoInPlaylistReducer) {
      const listVideo = videoInPlaylistReducer.videos;
      return (
        _.map(listVideo, (video, index) => (
          <div key={video._id} className="mt-3 related-video" style={{ display: videoActive === index || CurrentId === video.videoId ? 'none' : 'block' }} onClick={() => this.handleClick(index, video)} onKeyDown={() => {}} role="presentation">
            <img alt="thumbnails" className="img_watchvideo" src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`} />
            {' '}
            <span className="text-light">{video.title}</span>
            {' '}
          </div>
        ))
      );
    }
    return <Loading />;
  }

  render() {
    const { videoInPlaylistReducer, currentVideoReducer, getCurrentVideoAction } = this.props;
    if ((_.isEqual(videoInPlaylistReducer, {}) && _.isEqual(currentVideoReducer, {}))
    || !currentVideoReducer.like) {
      return (
        <div className="d-flex justify-content-center">
          <Loading />
        </div>
      );
    }
    const countLike = _.isEqual(currentVideoReducer.like, []) ? 0 : currentVideoReducer.like.length;
    const CurrentUserID = this.props.loginReducer.user.id;
    let sttLike;
    if (currentVideoReducer.like.includes(CurrentUserID)) {
      sttLike = true;
    } else {
      sttLike = false;
    }
    return (
      <div id="watchVideo">
        <FrameYouTube {...this.props} sttLike={sttLike} countLike={countLike} currentVideoReducer={currentVideoReducer} currentUser={this.props.loginReducer} getCurrentVideoAction={getCurrentVideoAction} />
        <div>
          <p className="color-title-videos">Related videos</p>
          <div className="d-flex justify-content-end flex-column">
            {this.renderList()}
          </div>
        </div>
      </div>
    );
  }
}

WatchVideo.defaultProps = {
  videoInPlaylistReducer: null,
  currentVideoReducer: null,
};

WatchVideo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      video: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  videoInPlaylistReducer: PropTypes.shape({
    videos: PropTypes.arrayOf(PropTypes.object),
  }),
  getCurrentVideoAction: PropTypes.func.isRequired,
  hideSearchBarAction: PropTypes.func.isRequired,
  fetchPlaylistWithIDAction: PropTypes.func.isRequired,
  currentVideoReducer: PropTypes.shape({
    title: PropTypes.string,
    videoId: PropTypes.string,
  }),
};

const actions = {
  hideSearchBarAction: hideSearchBar,
  fetchPlaylistWithIDAction: fetchPlaylistWithID,
  getCurrentVideoAction: getCurrentVideo,
  clearCurrentVideoAction: clearCurrentVideo,
};

function mapReducerProps({
  showSearchBarReducer, videoInPlaylistReducer, currentVideoReducer, loginReducer,
}) {
  return {
    showSearchBarReducer, videoInPlaylistReducer, currentVideoReducer, loginReducer,
  };
}


export default connect(mapReducerProps, actions)(WatchVideo);
