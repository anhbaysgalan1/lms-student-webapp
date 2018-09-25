import axios from 'axios';
import { API_PLAYLIST, API_VIDEO } from '../statics/urls';

export const FETCH_PLAYLIST = 'FETCH PLAYLIST';
export const FETCH_PLAYLIST_ID = 'FETCH_PLAYLIST_ID';

export const GET_CURRENT_VIDEO = 'GET_CURRENT_VIDEO';
export const CLEAR_CURRENT_VIDEO = 'CLEAR_CURRENT_VIDEO';

export function fetchPlaylist() {
  const request = axios.get(API_PLAYLIST);
  return {
    type: FETCH_PLAYLIST,
    payload: request,
  };
}

export function fetchPlaylistWithID(id) {
  const request = axios.get(`${API_PLAYLIST}/${id}`);
  return {
    type: FETCH_PLAYLIST_ID,
    payload: request,
  };
}

export function getCurrentVideo(id) {
  const request = axios.get(`${API_VIDEO}/${id}`);
  return {
    type: GET_CURRENT_VIDEO,
    payload: request,
  };
}

export function clearCurrentVideo() {
  return {
    type: CLEAR_CURRENT_VIDEO,
    payload: '',
  };
}
