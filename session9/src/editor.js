import { beginEdit, beginNew, updateDraft, saveDraft, discardDraft } from "./store.js";

const form = document.querySelector("#template-form");
const placeholder = document.querySelector("#editor-placeholder");
const error = document.querySelector("#editor-error");
const title = document.querySelector("#edit-title");
const category = document.querySelector("#edit-category");
const body = document.querySelector("#edit-body");

function showEditor(draft, heading) {
  title.value = draft.title;
  category.value = draft.category;
  body.value = draft.body;
  document.querySelector("#editor-heading").textContent = heading;
  document.querySelector("#message").textContent = "";
  error.textContent = "";
  placeholder.hidden = true;
  form.hidden = false;
  title.focus();
}

function hideEditor() {
  form.hidden = true;
  placeholder.hidden = false;
}

export function openEdit(id) {
  const draft = beginEdit(id);
  if (draft) showEditor(draft, "Edit template #" + id);
}

export function bindEditor(onSaved) {
  document.querySelector("#new-template").addEventListener("click", function () {
    showEditor(beginNew(), "New template");
  });
  document.querySelector("#cancel").addEventListener("click", function () {
    discardDraft();
    hideEditor();
  });
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    updateDraft({ title: title.value, category: category.value, body: body.value });
    const message = saveDraft();
    if (message) {
      error.textContent = message;
      return;
    }
    hideEditor();
    document.querySelector("#message").textContent = "Template saved.";
    onSaved();
  });
}
