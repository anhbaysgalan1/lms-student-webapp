import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { hideSearchBar } from '../../actions/showSearchbar';
import { fetchPlaylistWithID, getCurrentVideo, clearCurrentVideo } from '../../actions/videosInPlaylist';
import { API_VIDEO } from '../../statics/urls';
import Loading from '../Loading/loading';
import FrameYouTube from './FrameYoutube/FrameYoutube';
import ModalPopup from './Modal/ModalPopup';

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      videoActive: null,
      isLoading: false,
      toggleModal: false,
      countDownTime: null,
      nextVideoAuto: true,
    };
    this.renderList = this.renderList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.cancelAutoNextVideo = this.cancelAutoNextVideo.bind(this);
  }

  async componentDidMount() {
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

  componentWillReceiveProps(nextProps) {
    const { getCurrentVideoAction, currentVideoReducer, match } = this.props;
    if (!_.isEqual(nextProps.currentVideoReducer, currentVideoReducer)) {
      getCurrentVideoAction(match.params.video);
      this.setState({
        isLoading: true,
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onEnd() {
    const { videoInPlaylistReducer, match } = this.props;
    const { nextVideoAuto } = this.state;
    const currentIdVideo = match.params.video;
    const listVideos = videoInPlaylistReducer.videos;
    let NextVideos;
    let NextIndex;
    let closePopup = 5;
    this.setState({
      countDownTime: closePopup,
    });
    _.map(listVideos, (video, index) => {
      if (video._id === currentIdVideo
        && currentIdVideo !== listVideos[listVideos.length - 1]._id) {
        this.setState({
          toggleModal: true,
        });
        NextVideos = listVideos[index + 1];
        NextIndex = index + 1;
        setTimeout(() => {
          const interval = setInterval(() => {
            closePopup -= 1;
            this.setState({
              countDownTime: closePopup,
            });
            if (nextVideoAuto === true) {
              if (closePopup === 0) {
                clearInterval(interval);
                this.handleClick(NextIndex, NextVideos);
              }
            } else {
              clearInterval(interval);
            }
          }, 1000);
        }, 300);
      }
    });
  }

  cancelAutoNextVideo() {
    this.setState({
      nextVideoAuto: false,
      toggleModal: false,
    });
  }

  handleClick(index, video) {
    const { history, getCurrentVideoAction } = this.props;
    const objVideo = video;
    this.setState({
      videoActive: index,
      toggleModal: false,
    });

    getCurrentVideoAction(objVideo._id);
    objVideo.viewCount += 1;
    axios.put(`${API_VIDEO}/${objVideo._id}`, objVideo);
    history.push(`${objVideo._id}`);
  }

  renderList() {
    const { videoInPlaylistReducer, currentVideoReducer } = this.props;
    const { videoActive } = this.state;
    const { videoId: CurrentId } = currentVideoReducer;
    if (videoInPlaylistReducer) {
      const listVideo = videoInPlaylistReducer.videos;
      return (
        _.map(listVideo, (video, index) => (
          <div key={video._id} className={videoActive === index || CurrentId === video.videoId ? 'currentVideo mt-3' : 'mt-3 related-video'} onClick={() => this.handleClick(index, video)} onKeyDown={() => {}} role="presentation">
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
    const {
      isLoading, toggleModal, nextVideoAuto, countDownTime,
    } = this.state;
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
    const { viewCount } = currentVideoReducer;
    let sttLike;
    if (currentVideoReducer.like.includes(CurrentUserID)) {
      sttLike = true;
    } else {
      sttLike = false;
    }
    return (
      <div id="watchVideo">
        <FrameYouTube
          {...this.props}
          isLoading={isLoading}
          viewCount={viewCount}
          sttLike={sttLike}
          countLike={countLike}
          currentVideoReducer={currentVideoReducer}
          currentUser={this.props.loginReducer}
          getCurrentVideoAction={getCurrentVideoAction}
          onEnd={this.onEnd}
        />
        <div>
          <p className="color-title-videos">Related videos</p>
          <div className="d-flex justify-content-end flex-column">
            {this.renderList()}
            {toggleModal ? <ModalPopup modal={toggleModal} countDownTime={countDownTime} cancelAutoNextVideo={this.cancelAutoNextVideo} /> : ''}
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
