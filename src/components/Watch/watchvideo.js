import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { hideSearchBar } from '../../actions/showSearchbar';
import { fetchPlaylistWithID } from '../../actions/videosInPlaylist';
import Loading from '../Loading/loading';
import FrameYouTube from './FrameYoutube/FrameYoutube';

class WatchVideo extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      videoId: null,
      videoActive: null,
    };
    this.renderList = this.renderList.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const {
      match,
      fetchPlaylistWithIDAction,
      hideSearchBarAction,
    } = this.props;
    fetchPlaylistWithIDAction(match.params.id);
    hideSearchBarAction();
    this.setState({
      videoId: match.params.video,
    });
  }

  handleClick(index, videoId) {
    const { history } = this.props;
    this.setState({
      videoActive: index,
      videoId,
    });
    history.push(`${videoId}`);
  }

  renderList() {
    const { videoInPlaylistReducer } = this.props;
    const { videoActive, videoId } = this.state;
    if (videoInPlaylistReducer) {
      const listVideo = videoInPlaylistReducer.videos;
      console.log(listVideo);
      return (
        _.map(listVideo, (video, index) => (
          <div key={video._id} className="mt-3 related-video" style={{ display: videoActive === index || videoId === video.videoId ? 'none' : 'block' }} onClick={() => this.handleClick(index, video.videoId)} onKeyDown={() => {}} role="presentation">
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
    const { videoId, currentVideo } = this.state;
    const { videoInPlaylistReducer } = this.props;
    if (!videoInPlaylistReducer) {
      return (
        <Loading />
      );
    }
    return (
      <div id="watchVideo">
        <FrameYouTube videoId={videoId} video={currentVideo} />
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
  hideSearchBarAction: PropTypes.func.isRequired,
  fetchPlaylistWithIDAction: PropTypes.func.isRequired,
};

const actions = {
  hideSearchBarAction: hideSearchBar,
  fetchPlaylistWithIDAction: fetchPlaylistWithID,
};

function mapReducerProps({ showSearchBarReducer, videoInPlaylistReducer }) {
  return { showSearchBarReducer, videoInPlaylistReducer };
}


export default connect(mapReducerProps, actions)(WatchVideo);
