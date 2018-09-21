export const UPDATE_PARAMS = 'UPDATE_PARAMS';
export function updateParams(params) {
  return {
    type: UPDATE_PARAMS,
    payload: params,
  };
}
