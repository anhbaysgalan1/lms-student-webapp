import { SEARCH } from '../actions/searchAction';

export default function (state = null, action) {
  switch (action.type) {
    case SEARCH:
      return action;

    default:
      return state;
  }
}
