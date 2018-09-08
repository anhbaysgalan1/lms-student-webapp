export const SHOW_SEARCH_BAR = 'SHOW_SEARCH_BAR';
export const HIDE_SEARCH_BAR = 'HIDE_SEARCH_BAR';
export function showSearchBar() {
  return {
    type: SHOW_SEARCH_BAR,
    payload: true,
  };
}

export function hideSearchBar() {
  return {
    type: HIDE_SEARCH_BAR,
    payload: false,
  };
}
