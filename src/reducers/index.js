import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import playlistReducer from './playlistReducer';

export default combineReducers({
  loginReducer,
  playlistReducer,
});
