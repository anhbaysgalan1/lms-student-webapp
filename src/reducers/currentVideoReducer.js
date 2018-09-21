import {
  GET_CURRENT_VIDEO, CLEAR_CURRENT_VIDEO,
} from 'actions/videosInPlaylist';

export default function (state = null, action) {
  switch (action.type) {
    case GET_CURRENT_VIDEO: {
      console.log(action.payload.data.data);
      return action.payload.data.data;
    }

    case CLEAR_CURRENT_VIDEO: {
      return action.payload;
    }

    default:
      return { ...state };
  }
}
