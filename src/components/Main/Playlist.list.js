import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { PropTypes } from 'prop-types';

import { fetchPlaylist } from 'actions/playlist';

class ListPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandPlaylist: [],
    };

    this.renderListPlaylist = this.renderListPlaylist.bind(this);
    this.togglePlaylist = this.togglePlaylist.bind(this);
  }

  componentDidMount() {
    const { fetchPlaylistAction } = this.props;
    fetchPlaylistAction();
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

  renderListPlaylist(listPlaylist) {
    const { expandPlaylist } = this.state;

    return listPlaylist.map((playlistItem) => {
      const { playlists } = playlistItem;
      let playlistList = <div className="playlist-empty">Nothing to show!</div>;
      if (playlists && playlists.length > 0) {
        playlistList = playlists.map(playlist => (
          <Col md="4" className="playlist-item" key={playlist.playlist._id}>
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
          className={`playlist ${expandPlaylist.includes(playlistItem.classroomName) ? 'expand' : ''}`}
          key={playlistItem.classroomName}
        >
          <div className="title">
            <h3>
              {playlistItem.classroomName}
            </h3>
            <div>
              <Button className="view-more" onClick={() => { this.togglePlaylist(playlistItem.classroomName); }}>View more packages</Button>
              <Button className="view-less" onClick={() => { this.togglePlaylist(playlistItem.classroomName); }}>View less packages</Button>
            </div>
          </div>
          <Row className="playlist-list">
            {playlistList}
          </Row>
        </Col>
      );
    });
  }

  render() {
    const { playlistReducer } = this.props;
    const { playlist } = playlistReducer;

    if (playlist) {
      if (playlist.length === 0) {
        return (
          <div className="playlist-empty">Nothing to show!</div>
        );
      }
      return (
        <div className="playlists">
          {this.renderListPlaylist(playlist)}
        </div>
      );
    }

    return (
      <div>Loading...</div>
    );
  }
}

function mapReducerProps({ playlistReducer }) {
  return { playlistReducer };
}

const actions = {
  fetchPlaylistAction: fetchPlaylist,
};

ListPlaylist.propTypes = {
  playlistReducer: PropTypes.shape({
    playlist: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  fetchPlaylistAction: PropTypes.func.isRequired,
};

export default connect(mapReducerProps, actions)(ListPlaylist);
