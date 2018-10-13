export const ROUTE_STUDENT_ROOT = '';

export const ROUTE_STUDENT_LOGIN = `${ROUTE_STUDENT_ROOT}/login`;
export const ROUTE_STUDENT_CHECK = `${ROUTE_STUDENT_LOGIN}/check`;

export const ROUTE_DETAIL_PLAYLIST = `${ROUTE_STUDENT_ROOT}/playlist`;
export const ROUTE_DETAIL_PLAYLIST_ID = `${ROUTE_STUDENT_ROOT}/playlist/:id`;

export const ROUTE_VIDEO = `${ROUTE_STUDENT_ROOT}/playlist/:id/:video`;

export const ROUTE_PROFILE = '/profile';
export const ROUTE_PROFILE_SCOREBOARD = '/profile/:id';
