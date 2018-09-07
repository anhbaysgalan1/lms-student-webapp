import _ from 'lodash';
import {
  FETCH_PLAYLIST, FETCH_PLAYLIST_ID,
} from '../actions/videosInPlaylist';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_PLAYLIST: {
      const success = _.get(action.payload, 'data.success');
      const data = _.get(action.payload, 'data.data');

      return success ? { ...state, ...data } : state;
    }

    case FETCH_PLAYLIST_ID: {
      const success = _.get(action.payload, 'data.success');
      const data = _.get(action.payload, 'data.data');

      return success ? { ...state, ...data } : state;
    }

    default:
      return { ...state };
  }
}
