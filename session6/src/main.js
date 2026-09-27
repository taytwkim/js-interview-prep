import { getReservations, updateSeats, toggleStatus, resetOrder } from "./store.js";
import { calculateSummary } from "./pricing.js";
import { renderReservations, renderSummary, showMessage } from "./view.js";

const filter = document.querySelector("#status-filter");

function refresh() {
  const reservations = getReservations();
  renderReservations(reservations, filter.value, { onSeats: handleSeats, onToggle: handleToggle });
  renderSummary(calculateSummary(reservations));
}

function handleSeats(id, value) {
  showMessage(updateSeats(id, value));
  refresh();
}

function handleToggle(id) {
  toggleStatus(id);
  showMessage("");
  refresh();
}

filter.addEventListener("change", refresh);
document.querySelector("#reset").addEventListener("click", function () {
  resetOrder();
  filter.value = "all";
  showMessage("");
  refresh();
});

filter.value = "all";
refresh();
