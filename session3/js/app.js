QueueApp.readFilters = function () {
  QueueApp.state.filters = {
    search: document.querySelector("#search").value,
    status: document.querySelector("#status-filter").value,
    priority: document.querySelector("#priority-filter").value,
    sort: document.querySelector("#sort").value
  };
  document.querySelector("#app-message").textContent = "";
  QueueApp.render();
};

QueueApp.clearFilters = function () {
  document.querySelector("#search").value = "";
  document.querySelector("#status-filter").value = "all";
  document.querySelector("#priority-filter").value = "all";
  document.querySelector("#sort").value = "oldest";
  QueueApp.readFilters();
};

document.querySelector("#search").addEventListener("input", QueueApp.readFilters);
for (const selector of ["#status-filter", "#priority-filter", "#sort"]) {
  document.querySelector(selector).addEventListener("change", QueueApp.readFilters);
}
document.querySelector("#clear-filters").addEventListener("click", QueueApp.clearFilters);
document.querySelector("#new-ticket").addEventListener("click", function () {
  QueueApp.openEditor(null);
});

document.querySelector("#close-selected").addEventListener("click", function () {
  if (QueueApp.state.draft || QueueApp.state.selectedIds.length === 0) return;
  const ids = QueueApp.getVisibleTickets().map(function (ticket) { return ticket.id; });
  const changed = QueueApp.closeTickets(ids);
  document.querySelector("#app-message").textContent = changed + " ticket(s) closed.";
  QueueApp.render();
});

QueueApp.bindEditor();
QueueApp.clearFilters();
