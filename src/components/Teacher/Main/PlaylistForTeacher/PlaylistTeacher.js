import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPlaylist } from 'actions/playlist';

class PlayListForTeacher extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    const { fetchPlaylistAction } = this.props;
    fetchPlaylistAction();
  }

  render() {
    console.log(this.props.playlistReducer);
    return (
      <div>
       Videos Teachers
      </div>
    );
  }
}

function mapReducerProps({ loginReducer, playlistReducer, showSearchBarReducer, searchReducer }) {
  return { loginReducer, playlistReducer, showSearchBarReducer, searchReducer };
}

const actions = {
  fetchPlaylistAction: fetchPlaylist,
  // showSearchBarAction: showSearchBar,
  // hideSearchBarAction: hideSearchBar,
  // ResetAction: Reset,
};

export default connect(mapReducerProps, actions)(PlayListForTeacher);
