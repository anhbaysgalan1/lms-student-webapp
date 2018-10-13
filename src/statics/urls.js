// export const ROOT_URL = 'http://localhost:9000';
// export const ROOT_URL = 'https://tklms-api.herokuapp.com';
export const ROOT_URL = process.env.NODE_ENV === 'development' ? 'https://tklms-api.herokuapp.com' : 'https://learn.techkids.vn';

export const API_URL = `${ROOT_URL}/api`;

export const API_AUTH = `${API_URL}/auth`;

export const API_PLAYLIST = `${API_URL}/playlists`;

export const API_VIDEO = `${API_URL}/videos`;

export const API_DETAIL_USER = `${API_URL}/users/`;

// WORM
export const API_WORM = `${ROOT_URL}/worm/api`;

export const API_WORM_CLASSROOM = `${API_WORM}/grades?classroom_id=`;
