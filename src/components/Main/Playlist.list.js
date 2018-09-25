import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { PropTypes } from 'prop-types';
import { fetchPlaylist } from 'actions/playlist';
import { showSearchBar, hideSearchBar } from '../../actions/showSearchbar';
import { Reset } from '../../actions/searchAction';
import { ROUTE_DETAIL_PLAYLIST } from '../routes';

class ListPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandPlaylist: [],
    };
    this.nextPath = this.nextPath.bind(this);
    this.renderListPlaylist = this.renderListPlaylist.bind(this);
    this.togglePlaylist = this.togglePlaylist.bind(this);
    this.clickToShowSearchBar = this.clickToShowSearchBar.bind(this);
  }

  componentDidMount() {
    const { fetchPlaylistAction, hideSearchBarAction } = this.props;
    fetchPlaylistAction();
    hideSearchBarAction();
  }

  nextPath(path) {
    const { history } = this.props;
    history.push(path);
  }

  togglePlaylist(playlistName) {
    let { expandPlaylist } = this.state;

    if (expandPlaylist.indexOf(playlistName) === -1) {
      expandPlaylist.push(playlistName);
    } else {
      expandPlaylist = expandPlaylist.filter(playlist => playlist !== playlistName);
    }

    this.setState({ expandPlaylist });
  }

  clickToShowSearchBar() {
    const { showSearchBarAction, ResetAction } = this.props;
    showSearchBarAction();
    ResetAction();
  }

  renderListPlaylist(listPlaylist, personalPlaylists) {
    const { loginReducer } = this.props;
    const { user } = loginReducer;
    const { expandPlaylist } = this.state;
    
    let personalPlaylistElem = '';

    if(personalPlaylists && personalPlaylists.length > 0) {
      const personalPlaylistList = personalPlaylists.map(playlist => (
        <Col
          md="4"
          className="playlist-item"
          key={playlist.playlist._id}
          onClick={() => {
            this.nextPath(`${ROUTE_DETAIL_PLAYLIST}/${playlist.playlist._id}`);
            this.clickToShowSearchBar();
          }}
        >
          <div>
            <div className="playlist-title">
              {playlist.playlist.title}
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
      ));
      personalPlaylistElem = (
        <Col
          md="12"
          className={`playlist ${expandPlaylist.includes('personalPlaylist') ? 'expand' : 'unexpand'}`}
          key="personalPlaylist"
        >
          <div className="title">
            <h3>
              For you
            </h3>
            { personalPlaylists.length > 3 ? (
              <div>
                <Button className="view-more" onClick={() => { this.togglePlaylist('personalPlaylist'); }}>View more packages</Button>
                <Button className="view-less" onClick={() => { this.togglePlaylist('personalPlaylist'); }}>View less packages</Button>
              </div>
            ) : '' }
          </div>
          <Row
            className="playlist-list" 
            style={{ height: personalPlaylists && personalPlaylists.length > 0 ? Math.ceil(personalPlaylists.length/3)*200 : 200 }}
          >
            {personalPlaylistList}
          </Row>
        </Col>
      );
    }

    const listPlaylistElem = listPlaylist.map((playlistItem) => {
      const { playlists } = playlistItem;
      let playlistList = <div className="playlist-empty">Nothing to show!</div>;
      if (playlists && playlists.length > 0) {
        playlistList = playlists.map(playlist => (
          <Col
            md="4"
            className="playlist-item"
            key={playlist.playlist._id}
            onClick={() => {
              this.nextPath(`${ROUTE_DETAIL_PLAYLIST}/${playlist.playlist._id}`);
              this.clickToShowSearchBar();
            }}
          >
            <div>
              <div className="playlist-title">
                {playlist.playlist.title}
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
        ));
      }
      return (
        <Col
          md="12"
          className={`playlist ${expandPlaylist.includes(playlistItem.classroomName) ? 'expand' : 'unexpand'}`}
          key={playlistItem.classroomName}
        >
          <div className="title">
            <h3>
              {playlistItem.classroomName}
            </h3>
            { playlists.length > 3 ? (
              <div>
                <Button className="view-more" onClick={() => { this.togglePlaylist(playlistItem.classroomName); }}>View more packages</Button>
                <Button className="view-less" onClick={() => { this.togglePlaylist(playlistItem.classroomName); }}>View less packages</Button>
              </div>
            ) : '' }
          </div>
          <Row
            className="playlist-list"
            style={{ height: playlists && playlists.length > 0 ? Math.ceil(playlists.length / 3) * 200 : 200 }}
          >
            {playlistList}
          </Row>
        </Col>
      );
    });

    return (
      <div>
        {personalPlaylistElem}
        {listPlaylistElem}
      </div>
    )
  }

  render() {
    const { playlistReducer } = this.props;
    const { playlist, personalPlaylists } = playlistReducer;

    if (playlist) {
      if (playlist.length === 0) {
        return (
          <div className="playlist-empty">Nothing to show!</div>
        );
      }
      return (
        <div className="playlists">
          {this.renderListPlaylist(playlist, personalPlaylists)}
        </div>
      );
    }

    return (
      <div>Loading...</div>
    );
  }
}

function mapReducerProps({ loginReducer, playlistReducer, showSearchBarReducer, searchReducer }) {
  return { loginReducer, playlistReducer, showSearchBarReducer, searchReducer };
}

const actions = {
  fetchPlaylistAction: fetchPlaylist,
  showSearchBarAction: showSearchBar,
  hideSearchBarAction: hideSearchBar,
  ResetAction: Reset,
};

ListPlaylist.defaultProps = {
  searchReducer: {},
};

ListPlaylist.propTypes = {
  playlistReducer: PropTypes.shape({
    playlist: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  fetchPlaylistAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
  showSearchBarAction: PropTypes.func.isRequired,
  hideSearchBarAction: PropTypes.func.isRequired,
  ResetAction: PropTypes.func.isRequired,
  searchReducer: PropTypes.shape({
    type: PropTypes.string,
    payload: PropTypes.string,
    queryAll: PropTypes.bool,
  }),
  loginReducer: PropTypes.shape({
    user: PropTypes.object,
    errMsg: PropTypes.string,
  }).isRequired,
};

export default connect(mapReducerProps, actions)(ListPlaylist);
