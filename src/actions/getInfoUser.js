import axios from 'axios';
import { API_AUTH, API_PLAYLIST } from '../statics/urls';

export const GET_INFO_USER = 'GET_INFO_USER';

export async function getInfoUser() {
  const requestInfo = await axios.get(`${API_AUTH}`);
  const requestPlaylist = await axios.get(`${API_PLAYLIST}`);
  const SaveInfo = {
    idUser: 'CuLua',
    info: requestInfo,
    yourPlaylist: requestPlaylist,
  };
  return {
    type: GET_INFO_USER,
    payload: SaveInfo,
  };
}
