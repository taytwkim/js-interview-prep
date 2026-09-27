import { people } from "./data.js";
import { getState, updateFilters, movePage, resetState } from "./store.js";
import { getDirectoryPage } from "./directory.js";
import { renderDirectory } from "./view.js";

const search = document.querySelector("#search");
const team = document.querySelector("#team");
const sort = document.querySelector("#sort");

function refresh() {
  renderDirectory(getDirectoryPage(people, getState()));
}

function filtersChanged() {
  updateFilters({ query: search.value, team: team.value, sort: sort.value });
  refresh();
}

function navigate(change) {
  const model = getDirectoryPage(people, getState());
  movePage(change, model.pageCount);
  refresh();
}

function reset() {
  resetState();
  search.value = "";
  team.value = "all";
  sort.value = "asc";
  refresh();
}

search.addEventListener("input", filtersChanged);
team.addEventListener("change", filtersChanged);
sort.addEventListener("change", filtersChanged);
document.querySelector("#previous").addEventListener("click", function () { navigate(-1); });
document.querySelector("#next").addEventListener("click", function () { navigate(1); });
document.querySelector("#reset").addEventListener("click", reset);

reset();
