import axios from 'axios';
import { API_PLAYLIST } from '../statics/urls';

export const FETCH_PLAYLIST = 'FETCH PLAYLIST';

export function fetchPlaylist() {
  const request = axios.get(API_PLAYLIST);
  return {
    type: FETCH_PLAYLIST,
    payload: request,
  };
}
