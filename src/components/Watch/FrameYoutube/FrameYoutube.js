import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FrameYouTube extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { videoId } = this.props;
    this.state = {
      videoId,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { videoId } = this.props;
    if (videoId !== nextProps.videoId) {
      this.setState({
        videoId: nextProps.videoId,
      });
    }
  }

  render() {
    const { videoId } = this.state;
    return (
      <div id="frameVideo">
        <iframe
          title="Video"
          width="640"
          height="480"
          allowFullScreen
          frameBorder="0"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        />
        <div>
          <div>
            <div>
              AHIHI
            </div>
            <span>
              <i className="far fa-eye" />
              {' '}
                      500
            </span>
            <span>
              <i className="far fa-heart" />
              {' '}
              500
            </span>
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
  videoId: PropTypes.string.isRequired,
};


export default FrameYouTube;
