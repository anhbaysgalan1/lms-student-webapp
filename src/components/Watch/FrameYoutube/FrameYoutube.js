import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import axios from 'axios';
import Loading from '../../Loading/loading';

class FrameYouTube extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { currentVideoReducer } = this.props;
    this.state = {
      currentVideoReducer,
    };
  }

  async componentDidMount() {
    const getData = await axios.get('http://localhost:9000/api/videos');
    console.log(getData);
  }

  componentWillReceiveProps(nextProps) {
    const { currentVideoReducer } = this.props;
    if (currentVideoReducer !== nextProps.currentVideoReducer) {
      this.setState({
        currentVideoReducer: nextProps.currentVideoReducer,
      });
    }
  }

  render() {
    const { currentVideoReducer } = this.state;
    const arrLike = currentVideoReducer.like;
    const flag = _.isEqual(arrLike, []);
    let countLike;

    if (_.isEqual(currentVideoReducer, {})) {
      return <Loading />;
    }
    if (flag) {
      countLike = 0;
    } else {
      countLike = arrLike.length;
    }
    return (
      <div id="frameVideo">
        <iframe
          title="Video"
          width="860"
          height="600"
          allowFullScreen
          frameBorder="0"
          src={`https://www.youtube.com/embed/${currentVideoReducer.videoId}?rel=0`}
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
                {currentVideoReducer.viewCount}
              </span>
              <span className="ml-2">
                <i className="far fa-heart" />
                {' '}
                {countLike}
              </span>
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
