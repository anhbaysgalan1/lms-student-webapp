import _ from 'lodash';
import {
  FETCH_PLAYLIST,
} from 'actions/playlist';

export default function (state = { playlist: null }, action) {
  switch (action.type) {
    case FETCH_PLAYLIST: {
      const success = _.get(action.payload, 'data.success');
      const data = _.get(action.payload, 'data.data');

      return success ? { ...state, ...data } : state;
    }
    default:
      return { ...state };
  }
}
