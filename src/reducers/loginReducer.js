import _ from 'lodash';
import {
  LOGIN, CHECK_AUTH, LOGOUT, LOGIN_REMEMBER,
} from '../actions/authAction';

export default function (state = { user: null, errMsg: null, checked: null }, action) {
  switch (action.type) {
    case LOGIN: {
      const success = _.get(action.payload.request, 'data.success');
      const data = _.get(action.payload.request, 'data.data');
      const message = _.get(action.payload.request, 'data.message');
      const checked = _.get(action.payload, 'checked');
      if (checked && data) {
        localStorage.removeItem('rememberData');
        const dataSave = data;
        dataSave.hashPassword = 'Định xem pass á? Không có mùa xuân đấy đâu!';
        localStorage.setItem('rememberData', JSON.stringify(dataSave));
        localStorage.setItem('rememberuser', JSON.stringify(dataSave));
      }
      if (data) {
        return success
          ? { ...state, user: data, errMsg: null }
          : { ...state, user: null, errMsg: message };
      }
      return success
        ? { ...state, user: data, errMsg: null }
        : { ...state, user: null, errMsg: message };
    }

    case LOGIN_REMEMBER: {
      console.log('Remember');

      const success = _.get(action.payload.request, 'data.success');
      const data = _.get(action.payload.request, 'data.data');
      const message = _.get(action.payload.request, 'data.message');
      if (data) {
        return success
          ? { ...state, user: data, errMsg: null }
          : { ...state, user: null, errMsg: message };
      }
      return success
        ? { ...state, user: data, errMsg: null }
        : { ...state, user: null, errMsg: message };
    }

    case CHECK_AUTH: {
      const success = _.get(action.payload, 'data.success');
      const data = _.get(action.payload, 'data.data');
      return success ? { ...state, user: data, errMsg: null }
        : { ...state, user: null, errMsg: null };
    }
    case LOGOUT:
    {
      localStorage.removeItem('rememberData');
      return { user: null, errMsg: null };
    }

    default:
      return state;
  }
}
