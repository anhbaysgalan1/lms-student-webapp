import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import playlistReducer from './playlistReducer';
import videoInPlaylistReducer from './videosInPlaylistReducer';
import showSearchBarReducer from './showSearchBarReducer';
import searchReducer from './searchReducer';
import watchvideoReducer from './stateWatchVideo';
import currentVideoReducer from './currentVideoReducer';
import getInfoUserReducer from './getInfoUserReducer';

export default combineReducers({
  loginReducer,
  playlistReducer,
  videoInPlaylistReducer,
  showSearchBarReducer,
  searchReducer,
  watchvideoReducer,
  currentVideoReducer,
  getInfoUserReducer,
});
