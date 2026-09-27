import { exampleRequests } from "./data.js";

function initialState() {
  return {
    requests: structuredClone(exampleRequests),
    selectedIds: [],
    filters: { query: "", category: "all", status: "all", sort: "id" }
  };
}

let state = initialState();

export function getState() { return state; }
export function resetState() { state = initialState(); }
export function setFilters(filters) { state.filters = { ...state.filters, ...filters }; }

export function setSelected(id, checked) {
  if (!state.requests.some(function (request) { return request.id === id; })) return;
  if (checked && !state.selectedIds.includes(id)) state.selectedIds.push(id);
  if (!checked) state.selectedIds = state.selectedIds.filter(function (selected) { return selected !== id; });
}

export function setManySelected(ids, checked) {
  for (const id of ids) setSelected(id, checked);
}

export function approveSelected() {
  let changed = 0;
  for (const request of state.requests) {
    if (state.selectedIds.includes(request.id) && request.status !== "approved") {
      request.status = "approved";
      changed++;
    }
  }
  state.selectedIds = [];
  return changed;
}
