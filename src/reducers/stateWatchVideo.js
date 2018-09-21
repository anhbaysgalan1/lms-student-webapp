import { UPDATE_PARAMS } from '../actions/Params';

export default function (state = null, action) {
  switch (action.type) {
    case UPDATE_PARAMS:
      return action.payload;

    default:
      return state;
  }
}
