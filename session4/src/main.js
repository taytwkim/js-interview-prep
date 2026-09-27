import { searchWorkshops } from "./api.js";
import { getState, subscribe, canUndo, addWorkshop, changeSeats, removeWorkshop, clearPlan, undo } from "./store.js";
import { showLoading, showSearchError, renderCatalog, bindCatalogActions } from "./catalog-view.js";
import { bindPlanActions, renderPlan } from "./plan-view.js";

const search = document.querySelector("#search");
let latestRequest = 0;

async function loadCatalog() {
  showLoading();
  try {
    const thisRequest = ++latestRequest;
    const workshops = await searchWorkshops(search.value);

    if (thisRequest !== latestRequest) {
      return;
    }
    
    renderCatalog(workshops, addWorkshop);
  } catch (error) {
    console.error(error);
    showSearchError();
  }
}

function refreshPlan() {
  renderPlan(getState(), canUndo());
}

bindCatalogActions(addWorkshop);
bindPlanActions({ onChange: changeSeats, onRemove: removeWorkshop, onClear: clearPlan, onUndo: undo });

subscribe(refreshPlan);
search.addEventListener("input", loadCatalog);

search.value = "";
refreshPlan();
loadCatalog();
