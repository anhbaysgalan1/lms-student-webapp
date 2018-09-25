import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import PlayListForTeacher from './PlaylistForTeacher/PlaylistTeacher';

// import { ROUTE_STUDENT_ROOT, ROUTE_DETAIL_PLAYLIST_ID, ROUTE_VIDEO } from 'components/routes';
import NavBar from '../../NavBar';

export default function MainTeacher() {
  return (
    <Container fluid className="main-content">
      <NavBar />
      <Switch>
        <Route
          path="/"
          component={PlayListForTeacher}
        />
      </Switch>
    </Container>
  );
}
