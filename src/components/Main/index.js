import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import { ROUTE_STUDENT_ROOT, ROUTE_DETAIL_PLAYLIST_ID, ROUTE_VIDEO } from 'components/routes';

import NavBar from '../NavBar';
import ListPlaylist from './Playlist.list';
import VideosInPlaylist from '../Video/Video';

import './index.css';
import WatchVideo from '../Watch/watchvideo';

export default function Main() {
  return (
    <Container fluid className="main-content">
      <NavBar />
      <Switch>
        <Route
          path={ROUTE_VIDEO}
          component={WatchVideo}
        />
        <Route
          path={ROUTE_DETAIL_PLAYLIST_ID}
          component={VideosInPlaylist}
        />
        <Route
          exact
          path={ROUTE_STUDENT_ROOT}
          component={ListPlaylist}
        />
      </Switch>
    </Container>
  );
}
