import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import YouTube from 'react-youtube';
import { API_VIDEO } from '../../../statics/urls';
// import { getCurrentVideo } from '../../../actions/videosInPlaylist';
import Loading from '../../Loading/loading';

class FrameYouTube extends Component {
  constructor(props) {
    super(props);
    const {
      currentVideoReducer,
      sttLike,
      countLike,
      viewCount,
    } = this.props;
    this.state = {
      currentVideoReducer,
      sttLike,
      countLike,
      viewCount,
    };
    this.handleLike = this.handleLike.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { currentVideoReducer } = this.props;
    if (!_.isEqual(currentVideoReducer, nextProps.currentVideoReducer)) {
      this.setState({
        currentVideoReducer: nextProps.currentVideoReducer,
        sttLike: nextProps.sttLike,
        countLike: nextProps.countLike,
        viewCount: nextProps.viewCount,
      });
    }
  }

  handleLike() {
    const { currentVideoReducer, currentUser } = this.props;
    const { sttLike, countLike } = this.state;
    const CurrentUserID = currentUser.user.id;
    if (currentVideoReducer.like.includes(CurrentUserID)) {
      currentVideoReducer.like.splice(currentVideoReducer.like.indexOf(CurrentUserID), 1);
      this.setState({
        sttLike: !sttLike,
        countLike: countLike - 1,
      });
    } else {
      currentVideoReducer.like.push(CurrentUserID);
      this.setState({
        sttLike: !sttLike,
        countLike: countLike + 1,
      });
    }
    axios.put(`${API_VIDEO}/${currentVideoReducer._id}`, currentVideoReducer);
  }

  render() {
    const {
      currentVideoReducer,
      countLike,
      sttLike,
      viewCount,
    } = this.state;
    const { onEnd, onPlay } = this.props;
    const opts = {
      playerVars: {
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
      },
    };
    if (_.isEqual(currentVideoReducer, {})) {
      return <div id="frameVideoLoading"><Loading /></div>;
    }
    return (
      <div id="frameVideo" className="sticky-top mt-3">
        <div className="embed-responsive embed-responsive-16by9">
          <YouTube
            id="iframeYoutube"
            opts={opts}
            videoId={currentVideoReducer.videoId}
            onEnd={onEnd}
            onPlay={onPlay}
          />
        </div>
        <div>
          <div key={currentVideoReducer._id} className="d-flex justify-content-between align-items-center">
            {/*  */}
            <div>
              <span className="text-light title-videos-content">
                {currentVideoReducer.title}
                {' '}
              </span>
            </div>

            <div>
              <span>
                <i className="far fa-eye" />
                {' '}
                {viewCount}
              </span>
              <div className=" btn-like ml-2 d-inline-block" onClick={() => { this.handleLike(); }} onKeyDown={() => {}} role="presentation">
                <span>
                  <i className={sttLike ? 'fa fa-heart' : 'far fa-heart'} />
                  {' '}
                  {countLike}
                </span>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </div>
    );
  }
}

FrameYouTube.propTypes = {
  currentVideoReducer: PropTypes.shape({
    videoId: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      role: PropTypes.number,
    }),
  }).isRequired,
  sttLike: PropTypes.bool.isRequired,
  viewCount: PropTypes.number.isRequired,
  countLike: PropTypes.number.isRequired,
  onPlay: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
};


export default FrameYouTube;
