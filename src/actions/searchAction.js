export const SEARCH = 'SEARCH';
export const RESET = 'RESET';

export function Search(content) {
  let queryAll = false;
  if (content === '') {
    queryAll = true;
  }
  return {
    type: SEARCH,
    payload: content,
    queryAll,
  };
}

export function Reset() {
  const blank = '';
  const queryAll = true;
  return {
    type: RESET,
    payload: blank,
    queryAll,
  };
}
