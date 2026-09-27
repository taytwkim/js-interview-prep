import { clients } from "./data.js";

const records = structuredClone(clients);
let selectedId = records[0].id;
let draft = null;
let nextNoteId = 1;
const notes = [];

export function getClients() { return records; }
export function getSelectedClient() { return records.find(function (client) { return client.id === selectedId; }); }
export function selectClient(id) {
  if (!records.some(function (client) { return client.id === id; })) return;
  selectedId = id;
  draft = null;
}

export function beginChecklist() {
  const client = getSelectedClient();
  draft = { clientId: client.id, checklist: structuredClone(client.checklist) };
  return draft;
}

export function updateDraft(taskId, done) {
  if (!draft) return;
  const task = draft.checklist.find(function (item) { return item.id === taskId; });
  if (task) task.done = done;
}

export function saveChecklist() {
  if (!draft) return;
  const client = records.find(function (item) { return item.id === draft.clientId; });
  client.checklist = structuredClone(draft.checklist);
  draft = null;
}

export function discardChecklist() { draft = null; }

export function getNotes() {
  return notes.filter(function (note) { return note.clientId === selectedId; }).slice().reverse();
}

export function addNote(clientId, text) {
  if (text.trim() === "") return;
  notes.push({ id: nextNoteId++, clientId: clientId, text: text.trim() });
}
