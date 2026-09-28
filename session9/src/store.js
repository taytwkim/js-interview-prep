import { initialTemplates } from "./data.js";

// list of saved templates
const templates = structuredClone(initialTemplates);
let nextId = 104;
let editingId = null;

// which updates the draft has not been saved yet
let draft = null;

export function getTemplates() { return templates; }

export function beginEdit(id) {
  const template = templates.find(function (item) { return item.id === id; });
  if (!template) return null;
  editingId = id;
  draft = { title: template.title, category: template.category, body: template.body };
  return draft;
}

export function beginNew() {
  editingId = null;
  draft = { title: "", category: "General", body: "" };
  return draft;
}

export function discardDraft() { draft = null; }

export function updateDraft(fields) {
  if (draft) draft = { ...draft, ...fields };
}

export function saveDraft() {
  if (!draft) return "Open a template before saving.";
  const title = draft.title.trim();
  const body = draft.body.trim();
  if (!title || !body) return "Enter both a title and reply text.";

  const values = { title: title, category: draft.category, body: body };

  if (editingId === null) {
    templates.push({ id: nextId++, ...values });
  } else {
    const index = templates.findIndex(function (template) { return template.id === editingId; });
    if (index === -1) return "The template could not be found.";
    templates[index] = { id: editingId, ...values };
  }

  draft = null;
  return "";
}
