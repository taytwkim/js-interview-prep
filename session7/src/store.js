function defaults() {
  return { query: "", team: "all", sort: "asc", page: 1, pageSize: 4 };
}

let state = defaults();

export function getState() {
  return state;
}

export function updateFilters(filters) {
  state = { ...state, ...filters };
}

export function movePage(change, pageCount) {
  state = { ...state, page: Math.max(1, Math.min(pageCount, state.page + change)) };
}

export function resetState() {
  state = defaults();
}
