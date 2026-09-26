QueueApp.getVisibleTickets = function () {
  const filters = QueueApp.state.filters;
  const search = filters.search.trim().toLowerCase();
  const visible = QueueApp.state.tickets.filter(function (ticket) {
    const matchesSearch = (ticket.title + " " + ticket.customer).toLowerCase().includes(search);
    const matchesStatus = filters.status === "all" || ticket.status === filters.status;
    const matchesPriority = filters.priority === "all" || ticket.priority === filters.priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  visible.sort(function (a, b) {
    if (filters.sort === "newest") return b.id - a.id;
    if (filters.sort === "priority") {
      return QueueApp.priorityOrder[a.priority] - QueueApp.priorityOrder[b.priority] || a.id - b.id;
    }
    return a.id - b.id;
  });
  return visible;
};

QueueApp.renderTotals = function () {
  const counts = { open: 0, progress: 0, closed: 0 };
  for (const ticket of QueueApp.state.tickets) counts[ticket.status]++;
  document.querySelector("#total-count").textContent = QueueApp.state.tickets.length;
  document.querySelector("#open-count").textContent = counts.open;
  document.querySelector("#progress-count").textContent = counts.progress;
  document.querySelector("#closed-count").textContent = counts.closed;
};

QueueApp.render = function () {
  const visible = QueueApp.getVisibleTickets();
  const rows = document.querySelector("#ticket-rows");
  rows.innerHTML = "";

  visible.forEach(function (ticket, index) {
    const row = document.createElement("tr");
    const selected = QueueApp.state.selectedIds.includes(ticket.id);
    row.className = selected ? "selected" : "";

    const selectionCell = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selected;
    checkbox.setAttribute("aria-label", "Select ticket " + ticket.id);
    checkbox.addEventListener("change", function () {
      QueueApp.setSelected(ticket.id, checkbox.checked);
      QueueApp.render();
    });
    selectionCell.append(checkbox);

    const titleCell = document.createElement("td");
    titleCell.className = "ticket-title";
    const idText = document.createElement("span");
    idText.className = "ticket-id";
    idText.textContent = "#" + ticket.id;
    titleCell.append(idText, ticket.title);

    const customerCell = document.createElement("td");
    customerCell.textContent = ticket.customer;
    const priorityCell = document.createElement("td");
    priorityCell.textContent = QueueApp.priorityLabels[ticket.priority];
    const statusCell = document.createElement("td");
    statusCell.textContent = QueueApp.statusLabels[ticket.status];

    const actionCell = document.createElement("td");
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "secondary";
    openButton.textContent = "Open";
    openButton.setAttribute("aria-label", "Open ticket " + ticket.id);
    openButton.addEventListener("click", function () {
      QueueApp.openEditor(ticket.id);
    });
    actionCell.append(openButton);
    row.append(selectionCell, titleCell, customerCell, priorityCell, statusCell, actionCell);
    rows.append(row);
  });

  document.querySelector("#visible-count").textContent = visible.length;
  document.querySelector("#empty-message").hidden = visible.length > 0;
  document.querySelector("#selected-count").textContent = QueueApp.state.selectedIds.length;
  document.querySelector("#close-selected").disabled = QueueApp.state.selectedIds.length === 0 || Boolean(QueueApp.state.draft);
  QueueApp.renderTotals();
};
