import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { Col } from 'reactstrap';
import { fetchPlaylistWithID } from '../../actions/videosInPlaylist';
import { showSearchBar } from '../../actions/showSearchbar';
import './index1.css';
import thumbnail from '../../images/1.png';
import Loading from '../Loading/loading';

class VideosInPlaylist extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isLoading: true,
      timeOut: this.timeOutLoading(),
    };
  }

  componentDidMount() {
    const {
      match,
      fetchPlaylistWithIDAction,
      showSearchBarAction,
    } = this.props;
    showSearchBarAction();
    fetchPlaylistWithIDAction(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { videoInPlaylistReducer } = this.props;
    const { timeOut } = this.state;
    if (videoInPlaylistReducer !== nextProps.videoInPlaylistReducer) {
      /* eslint-disable */
      timeOut; 
      /* eslint-enable */
    }
  }

  componentWillUnmount() {
    const { timeOut } = this.state;
    clearTimeout(timeOut);
  }

  timeOutLoading() {
    const timeOut = setTimeout(() => {
      this.setState({ isLoading: false });
    },
    500);
    return timeOut;
  }

  renderVideos() {
    const { videoInPlaylistReducer, searchReducer } = this.props;
    if (searchReducer && !searchReducer.queryAll) {
      const ListAfterFilter = videoInPlaylistReducer.videos.filter((el) => {
        const title = el.title.toLowerCase().replace(' ', '');
        const valueNeedSearch = searchReducer.payload.toLowerCase().replace(' ', '');
        return title.includes(valueNeedSearch);
      });
      return (
        _.map(ListAfterFilter, el => (
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
    if (!videoInPlaylistReducer.videos || isLoading) {
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

function mapReducerProps({ videoInPlaylistReducer, showSearchBarReducer, searchReducer }) {
  return { videoInPlaylistReducer, showSearchBarReducer, searchReducer };
}

const actions = {
  fetchPlaylistWithIDAction: fetchPlaylistWithID,
  showSearchBarAction: showSearchBar,
};

VideosInPlaylist.defaultProps = {
  searchReducer: null,
};

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

  showSearchBarAction: PropTypes.func.isRequired,
  searchReducer: PropTypes.shape({
    type: PropTypes.string,
    queryAll: PropTypes.bool,
    payload: PropTypes.string,
  }),
};

export default connect(mapReducerProps, actions)(VideosInPlaylist);