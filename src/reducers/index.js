import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import playlistReducer from './playlistReducer';
import videoInPlaylistReducer from './videosInPlaylistReducer';

export default combineReducers({
  loginReducer,
  playlistReducer,
  videoInPlaylistReducer,
});
