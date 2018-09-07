import axios from 'axios';
import { API_PLAYLIST } from '../statics/urls';

export const FETCH_PLAYLIST = 'FETCH PLAYLIST';
export const FETCH_PLAYLIST_ID = 'FETCH_PLAYLIST_ID';

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
