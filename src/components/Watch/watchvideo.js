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
import { NextVideosHandle } from '../../utils';
import CodeLive from '../CodeLive/codelive';
import expandButton from '../../images/button/expand_button.png';
import expandButtonReverse from '../../images/button/expand_button_reverse.png';

let interval;
let setTimeOutCollaps;

const initialCSS = {
  expandList: '95%',
  widthList: 100,
  heightList: 100,
};

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      videoActive: null,
      isLoading: false,
      toggleModal: false,
      countDownTime: null,
      increaseView: true,
      // _______________
      expandList: initialCSS.expandList,
      widthList: initialCSS.widthList,
      heightList: initialCSS.heightList,
    };
    this.renderList = this.renderList.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.cancelAutoNextVideo = this.cancelAutoNextVideo.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.handleNextVideoButton = this.handleNextVideoButton.bind(this);
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

  onPlay() {
    const { currentVideoReducer, getCurrentVideoAction } = this.props;
    const { increaseView } = this.state;
    if (increaseView) {
      currentVideoReducer.viewCount += 1;
      axios.put(`${API_VIDEO}/${currentVideoReducer._id}`, currentVideoReducer).then(
        getCurrentVideoAction(currentVideoReducer._id),
      );
      this.setState({
        increaseView: false,
      });
    }
  }

  onEnd() {
    const { videoInPlaylistReducer, match } = this.props;
    const currentIdVideo = match.params.video;
    const listVideos = videoInPlaylistReducer.videos;
    let closePopup = 100;
    this.setState({
      countDownTime: closePopup,
    });
    _.map(listVideos, (video, index) => {
      if (video._id === currentIdVideo
        && currentIdVideo !== listVideos[listVideos.length - 1]._id) {
        this.setState({
          toggleModal: true,
        });
        const NextVideos = listVideos[index + 1];
        const NextIndex = index + 1;
        setTimeout(() => {
          interval = setInterval(() => {
            closePopup -= 1;
            this.setState({
              countDownTime: closePopup,
            });
            if (closePopup === 0) {
              clearInterval(interval);
              this.handleClick(NextIndex, NextVideos);
            }
          }, 1000);
        }, 300);
      }
    });
  }

  handleNextVideoButton() {
    const { videoInPlaylistReducer, match } = this.props;
    const currentIdVideo = match.params.video;
    const listVideos = videoInPlaylistReducer.videos;
    // NextVideosHandle:
    // par1: listVideos
    // par2: currentIdVideo to compare Nextvideos
    // par3: function with 2par (NextVideos, NextIndex)
    NextVideosHandle(listVideos, currentIdVideo, this.handleClick);
  }

  cancelAutoNextVideo() {
    this.setState({
      toggleModal: false,
    });
    clearInterval(interval);
  }

  expandList() {
    const { widthList, expandList } = this.state;
    if (widthList === 0) {
      this.setState({
        widthList: initialCSS.widthList,
      });
      setTimeOutCollaps = setTimeout(() => {
        this.setState({
          heightList: 0,
        });
      }, 500);
    } else {
      clearTimeout(setTimeOutCollaps);
      this.setState({
        widthList: 0,
        heightList: 'auto',
      });
    }
    if (expandList === initialCSS.expandList) {
      this.setState({
        expandList: '-9.05px',
      });
    } else {
      this.setState({
        expandList: initialCSS.expandList,
      });
    }
  }

  handleClick(index, video) {
    const { history, getCurrentVideoAction } = this.props;
    const objVideo = video;
    this.setState({
      videoActive: index,
      toggleModal: false,
      increaseView: true,
    });
    getCurrentVideoAction(objVideo._id);
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
          <div key={video._id} className={(videoActive === index || CurrentId === video.videoId) ? 'currentVideo mt-3 d-flex align-items-center' : 'mt-3 related-video d-flex align-items-center'} onClick={() => this.handleClick(index, video)} onKeyDown={() => {}} role="presentation">
            <div className="img_watchvideo mr-3">
              <img alt="thumbnails" className="img_watchvideo" src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`} />
            </div>
            {' '}
            <span className="text-light text-md-left titleVideoTruncate text-truncate d-inline-block">{video.title}</span>
            {' '}
          </div>
        ))
      );
    }
    return (
      <div className="d-flex fullLoading justify-content-center align-items-center">
        <Loading />
      </div>
    );
  }

  render() {
    const {
      videoInPlaylistReducer, currentVideoReducer, getCurrentVideoAction, loginReducer,
    } = this.props;
    const {
      isLoading, toggleModal, countDownTime, expandList, widthList, heightList,
    } = this.state;
    if ((_.isEqual(videoInPlaylistReducer, {}) && _.isEqual(currentVideoReducer, {}))
    || !currentVideoReducer.like) {
      return (
        <div className="d-flex fullLoading justify-content-center align-items-center">
          <Loading />
        </div>
      );
    }
    const countLike = _.isEqual(currentVideoReducer.like, []) ? 0 : currentVideoReducer.like.length;
    const CurrentUserID = loginReducer.user.id;
    const { viewCount } = currentVideoReducer;
    let sttLike;
    if (currentVideoReducer.like.includes(CurrentUserID)) {
      sttLike = true;
    } else {
      sttLike = false;
    }
    return (
      <div id="watchVideo">
        <div className="row">
          <div className="col-md-8 sticky-top">
            <FrameYouTube
              {...this.props}
              isLoading={isLoading}
              viewCount={viewCount}
              sttLike={sttLike}
              countLike={countLike}
              currentVideoReducer={currentVideoReducer}
              currentUser={loginReducer}
              getCurrentVideoAction={getCurrentVideoAction}
              onEnd={this.onEnd}
              onPlay={this.onPlay}
            />
          </div>
          <div className="col-md-4 mt-3 position-relative">
            <div id="expandListsPlaylist" onClick={() => this.expandList()} role="presentation" className="sticky-top" style={{ left: `${expandList}` }}>
              <img src={widthList === 0 ? expandButtonReverse : expandButton} alt="button" />
            </div>
            <div id="renderList" style={{ transform: `translateX(${widthList}%)`, height: heightList }}>
              {this.renderList()}
            </div>
            <div id="frameCodelive">
              <CodeLive />
            </div>
            {toggleModal ? <ModalPopup modal={toggleModal} handleNextVideo={this.handleNextVideoButton} countDownTime={countDownTime} cancelAutoNextVideo={this.cancelAutoNextVideo} /> : ''}
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
