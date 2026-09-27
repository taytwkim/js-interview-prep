import { fetchBrief } from "./api.js";
import { getSelectedClient, selectClient } from "./store.js";
import { renderClients, renderWorkspace, showBriefLoading, renderBrief, showBriefError } from "./view.js";
import { bindEditors, dismissEditors } from "./editors.js";

let curr_client_id;

async function loadBrief(clientId) {
  showBriefLoading();
  try {
    const brief = await fetchBrief(clientId);

    if (clientId == curr_client_id) {
      renderBrief(brief);
    }
  } catch (error) {
    console.error(error);
    showBriefError();
  }
}

function openClient(id) {
  curr_client_id = id;
  dismissEditors();
  selectClient(id);
  renderWorkspace();
  loadBrief(id);
}

bindEditors();
renderClients(openClient);
openClient(getSelectedClient().id);
