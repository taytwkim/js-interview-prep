import { getTemplates } from "./store.js";
import { renderLibrary } from "./view.js";
import { bindEditor, openEdit } from "./editor.js";

const search = document.querySelector("#search");
const category = document.querySelector("#category-filter");

function refresh() {
  renderLibrary(getTemplates(), { query: search.value, category: category.value }, openEdit);
}

search.addEventListener("input", refresh);
category.addEventListener("change", refresh);

bindEditor(refresh);

search.value = "";
category.value = "all";
refresh();
