import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { Col, Container } from 'reactstrap';
import { fetchPlaylistWithID } from '../../actions/videosInPlaylist';
import { showSearchBar } from '../../actions/showSearchbar';
import './index1.css';
// import thumbnail from '../../images/1.png';
import Loading from '../Loading/loading';


class VideosInPlaylist extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      isLoading: true,
      timeOut: this.timeOutLoading(),
      hover: false,
      activeIndex: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
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

  onMouseEnter(index) {
    this.setState({
      hover: true,
      activeIndex: index,
    });
  }

  onMouseLeave() {
    this.setState({
      hover: false,
      activeIndex: null,
    });
  }

  timeOutLoading() {
    const timeOut = setTimeout(() => {
      this.setState({ isLoading: false });
    },
    500);
    return timeOut;
  }

  handleChange(video) {
    const { history, location } = this.props;
    history.push(`${location.pathname}/${video._id}`);
  }

  renderVideos() {
    const { videoInPlaylistReducer, searchReducer } = this.props;
    const { hover, activeIndex } = this.state;
    if (searchReducer && !searchReducer.queryAll) {
      const ListAfterFilter = videoInPlaylistReducer.videos.filter((el) => {
        const title = el.title.toLowerCase().replace(' ', '');
        const valueNeedSearch = searchReducer.payload.toLowerCase().replace(' ', '');
        return title.includes(valueNeedSearch);
      });
      return (
        _.map(ListAfterFilter, (el, index) => (
          <Col
            md="4"
            className="playlist-item items-video trans"
            key={el._id}
            onClick={() => this.handleChange(el)}
            onMouseEnter={() => this.onMouseEnter(index)}
            onMouseLeave={this.onMouseLeave}
          >
            <div>
              <div className="d-flex justify-content-center align-items-center">
                <img className="fit_img" src={`https://i.ytimg.com/vi/${el.videoId}/mqdefault.jpg`} alt="thumbnails" />
              </div>
              <div className={hover && activeIndex === index ? 'playlist-title word-wrap' : 'playlist-title word-wrap d-inline-block text-truncate'}>
                {el.title}
              </div>
              <div className="playlist-statics">
                <span className="playlist-views">
                  <i className="far fa-eye" />
                  {' '}
                  {el.viewCount}
                </span>
                <span className="playlist-likes">
                  <i className="far fa-heart" />
                  {' '}
                  { _.isEqual(el.like, []) ? 0 : el.like.length }
                </span>
              </div>
            </div>
          </Col>
        ))
      );
    }
    return (
      _.map(videoInPlaylistReducer.videos, (el, index) => (
        <Col
          md="4"
          className="playlist-item items-video trans"
          key={el._id}
          onClick={() => { this.handleChange(el); }}
          onMouseEnter={() => this.onMouseEnter(index)}
          onMouseLeave={this.onMouseLeave}
        >
          <div>
            <div className="d-flex justify-content-center">
              <img className="fit_img" src={`https://i.ytimg.com/vi/${el.videoId}/mqdefault.jpg`} alt="thumbnails" />
            </div>
            <div className={hover && activeIndex === index ? 'playlist-title word-wrap d-inline-block text-truncate' : 'playlist-title word-wrap d-inline-block text-truncate'}>
              {el.title}
            </div>
            <div className="playlist-statics">
              <span className="playlist-views">
                <i className="far fa-eye" />
                {' '}
                {el.viewCount}
              </span>
              <span className="playlist-likes">
                <i className="far fa-heart" />
                {' '}
                { _.isEqual(el.like, []) ? 0 : el.like.length }
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
        <div className="d-flex fullLoading justify-content-center align-items-center">
          <Loading />
        </div>
      );
    }
    return (
      <Container>
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
                <h3 className="text-light">Nothing to show in this Package!</h3>
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
      </Container>
    );
  }
}

function mapReducerProps({
  videoInPlaylistReducer, showSearchBarReducer, searchReducer, watchvideoReducer,
}) {
  return {
    videoInPlaylistReducer, showSearchBarReducer, searchReducer, watchvideoReducer,
  };
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
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  showSearchBarAction: PropTypes.func.isRequired,
  searchReducer: PropTypes.shape({
    type: PropTypes.string,
    queryAll: PropTypes.bool,
    payload: PropTypes.string,
  }),
};

export default connect(mapReducerProps, actions)(VideosInPlaylist);
