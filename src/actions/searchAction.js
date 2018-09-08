export const SEARCH = 'SEARCH';

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
