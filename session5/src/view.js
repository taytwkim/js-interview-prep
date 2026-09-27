import { getClients, getSelectedClient, getNotes } from "./store.js";

export function renderClients(onSelect) {
  const container = document.querySelector("#client-list");
  container.innerHTML = "";
  for (const client of getClients()) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = client.name;
    button.dataset.clientId = client.id;
    button.addEventListener("click", function () { onSelect(client.id); });
    container.append(button);
  }
}

export function renderWorkspace() {
  const client = getSelectedClient();
  document.querySelector("#client-name").textContent = client.name;
  for (const button of document.querySelectorAll("#client-list button")) {
    button.setAttribute("aria-pressed", String(button.dataset.clientId === client.id));
  }
  const completed = client.checklist.filter(function (task) { return task.done; }).length;
  document.querySelector("#checklist-summary").textContent = completed + " of " + client.checklist.length + " tasks complete";
  const list = document.querySelector("#saved-checklist");
  list.innerHTML = "";
  for (const task of client.checklist) {
    const row = document.createElement("li");
    row.className = task.done ? "complete" : "";
    row.textContent = (task.done ? "Complete: " : "Pending: ") + task.label;
    list.append(row);
  }
  const notes = getNotes();
  const noteList = document.querySelector("#notes-list");
  noteList.innerHTML = "";
  for (const note of notes) {
    const row = document.createElement("li");
    row.textContent = note.text;
    noteList.append(row);
  }
  document.querySelector("#notes-empty").hidden = notes.length > 0;
  document.querySelector("#note-count").textContent = notes.length + " note(s)";
}

export function showBriefLoading() {
  document.querySelector("#brief").textContent = "Loading client brief…";
}

export function renderBrief(brief) {
  const container = document.querySelector("#brief");
  container.innerHTML = "";
  const text = document.createElement("p");
  text.textContent = brief.text;
  const details = document.createElement("p");
  details.textContent = "Owner: " + brief.owner + " · Target: " + brief.targetDate;
  container.append(text, details);
}

export function showBriefError() {
  document.querySelector("#brief").textContent = "Unable to load this brief. Select the client again to retry.";
}
