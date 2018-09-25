import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import { API_VIDEO } from '../../../statics/urls';
import { getCurrentVideo } from '../../../actions/videosInPlaylist';
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
    // console.log(isLoading);
    if (_.isEqual(currentVideoReducer, {})) {
      return <div id="frameVideoLoading"><Loading /></div>;
    }
    return (
      <div id="frameVideo" className="sticky-top">
        <iframe
          title="Video"
          width="860"
          height="600"
          allowFullScreen
          frameBorder="0"
          allow="autoplay; encrypted-media"
          src={`https://www.youtube.com/embed/${currentVideoReducer.videoId}?rel=0&autoplay=1`}
        />
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
};


export default FrameYouTube;
