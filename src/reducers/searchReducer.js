import { SEARCH, RESET } from '../actions/searchAction';

export default function (state = null, action) {
  switch (action.type) {
    case SEARCH:
      return action;

    case RESET:
      return action;

    default:
      return state;
  }
}
