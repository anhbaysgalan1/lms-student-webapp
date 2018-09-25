import { SHOW_SEARCH_BAR, HIDE_SEARCH_BAR } from '../actions/showSearchbar';

export default function (state = null, action) {
  switch (action.type) {
    case SHOW_SEARCH_BAR:
      return action.payload;

    case HIDE_SEARCH_BAR:
      return action.payload;

    default:
      return state;
  }
}
