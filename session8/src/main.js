import { getState, setFilters, setSelected, setManySelected, approveSelected, resetState } from "./store.js";
import { getVisibleRequests, getSelectionSummary, allVisibleSelected } from "./selectors.js";
import { renderRequests, renderSelection, showMessage } from "./view.js";

const search = document.querySelector("#search");
const category = document.querySelector("#category");
const status = document.querySelector("#status");
const sort = document.querySelector("#sort");

function refresh() {
  const state = getState();
  const visible = getVisibleRequests(state);
  renderRequests(visible, state.selectedIds, handleSelection);
  renderSelection(getSelectionSummary(state, visible), visible.length);
}

function handleSelection(id, checked) {
  setSelected(id, checked);
  showMessage("");
  refresh();
}

function filtersChanged() {
  setFilters({ query: search.value, category: category.value, status: status.value, sort: sort.value });
  showMessage("");
  refresh();
}

document.querySelector("#select-visible").addEventListener("change", function () {
  const state = getState();
  const visible = getVisibleRequests(state);
  const shouldSelect = !allVisibleSelected(visible, state.selectedIds);
  setManySelected(visible.map(function (request) { return request.id; }), shouldSelect);
  showMessage("");
  refresh();
});

document.querySelector("#approve").addEventListener("click", function () {
  showMessage(approveSelected() + " request(s) approved.");
  refresh();
});

function reset() {
  resetState();
  search.value = "";
  category.value = "all";
  status.value = "all";
  sort.value = "id";
  showMessage("");
  refresh();
}

search.addEventListener("input", filtersChanged);
for (const input of [category, status, sort]) input.addEventListener("change", filtersChanged);

document.querySelector("#reset").addEventListener("click", reset);
reset();
