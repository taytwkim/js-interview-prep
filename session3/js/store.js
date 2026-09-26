QueueApp.state = {
  tickets: QueueApp.sampleTickets.map(function (ticket) { return { ...ticket }; }),
  selectedIds: [],
  filters: { search: "", status: "all", priority: "all", sort: "oldest" },
  draft: null,
  nextId: 7
};

QueueApp.findTicket = function (id) {
  return QueueApp.state.tickets.find(function (ticket) { return ticket.id === id; });
};

QueueApp.setSelected = function (id, selected) {
  const ids = QueueApp.state.selectedIds;
  if (selected && !ids.includes(id)) {
    ids.push(id);
  } else if (!selected) {
    QueueApp.state.selectedIds = ids.filter(function (selectedId) { return selectedId !== id; });
  }
};

QueueApp.beginDraft = function (id) {
  if (id === null) {
    QueueApp.state.draft = { id: null, title: "", customer: "", priority: "medium", status: "open" };
  } else {
    QueueApp.state.draft = { ...QueueApp.findTicket(id) };
  }
};

QueueApp.updateDraft = function (field, value) {
  if (QueueApp.state.draft) {
    QueueApp.state.draft[field] = value;
  }
};

QueueApp.saveDraft = function () {
  const draft = QueueApp.state.draft;
  if (!draft) return "No ticket is open.";
  if (draft.title.trim() === "" || draft.customer.trim() === "") {
    return "Enter both a title and a customer.";
  }

  const saved = { ...draft, title: draft.title.trim(), customer: draft.customer.trim() };
  if (saved.id === null) {
    saved.id = QueueApp.state.nextId;
    QueueApp.state.nextId++;
    QueueApp.state.tickets.push(saved);
  } else {
    const index = QueueApp.state.tickets.findIndex(function (ticket) { return ticket.id === saved.id; });
    QueueApp.state.tickets[index] = saved;
  }
  QueueApp.state.draft = null;
  return "";
};

QueueApp.discardDraft = function () {
  QueueApp.state.draft = null;
};

QueueApp.closeTickets = function (ids) {
  let changed = 0;
  for (const ticket of QueueApp.state.tickets) {
    if (ids.includes(ticket.id) && ticket.status !== "closed") {
      ticket.status = "closed";
      changed++;
    }
  }
  QueueApp.state.selectedIds = [];
  return changed;
};
