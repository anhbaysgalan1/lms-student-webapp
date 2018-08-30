import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import { ROUTE_STUDENT_ROOT } from 'components/routes';

import NavBar from '../NavBar';
import ListPlaylist from './Playlist.list';

import './index.css';

export default function Main() {
  return (
    <Container className="main-content">
      <NavBar />
      <Switch>
        <Route
          exact
          path={ROUTE_STUDENT_ROOT}
          component={ListPlaylist}
        />
      </Switch>
    </Container>
  );
}
