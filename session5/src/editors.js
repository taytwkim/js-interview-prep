import { beginChecklist, updateDraft, saveChecklist, discardChecklist, getSelectedClient, addNote } from "./store.js";
import { renderWorkspace } from "./view.js";

const checklistForm = document.querySelector("#checklist-form");
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-text");
const noteError = document.querySelector("#note-error");

function openChecklist() {
  const draft = beginChecklist();
  const container = document.querySelector("#draft-checklist");
  container.innerHTML = "";
  for (const task of draft.checklist) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", function () { updateDraft(task.id, checkbox.checked); });
    label.append(checkbox, task.label);
    container.append(label);
  }
  checklistForm.hidden = false;
}

function openNote() {
  noteInput.value = "";
  noteError.textContent = "";
  noteForm.hidden = false;
  noteInput.focus();
}

export function dismissEditors() {
  discardChecklist();
  checklistForm.hidden = true;
  noteForm.hidden = true;
}

export function bindEditors() {
  document.querySelector("#edit-checklist").addEventListener("click", openChecklist);
  checklistForm.addEventListener("submit", function (event) {
    event.preventDefault();
    saveChecklist();
    checklistForm.hidden = true;
    renderWorkspace();
  });
  document.querySelector("#cancel-checklist").addEventListener("click", function () {
    discardChecklist();
    checklistForm.hidden = true;
    renderWorkspace();
  });
  document.querySelector("#add-note").addEventListener("click", openNote);
  document.querySelector("#cancel-note").addEventListener("click", function () { noteForm.hidden = true; });

  noteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = noteInput.value.trim();
    if (text === "") {
      noteError.textContent = "Enter a note before saving.";
      return;
    }
    const clientId = getSelectedClient().id;
    addNote(clientId, text);
    noteForm.hidden = true;
    renderWorkspace();
  });
}
