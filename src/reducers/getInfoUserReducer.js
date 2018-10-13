import {
  GET_INFO_USER,
} from 'actions/getInfoUser';

export default function (state = null, action) {
  switch (action.type) {
    case GET_INFO_USER: {
      // console.log(action.payload);
      const dataRes = {
        info: action.payload.info.data.data,
        yourPlaylist: action.payload.yourPlaylist.data.data,
      };
      return dataRes;
    }
    default:
      return { ...state };
  }
}
