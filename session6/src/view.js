import { formatMoney } from "./pricing.js";

export function renderReservations(reservations, filter, handlers) {
  const list = document.querySelector("#reservation-rows");
  list.innerHTML = "";
  const visible = reservations.filter(function (reservation) {
    return filter === "all" || reservation.status === filter;
  });

  for (const reservation of visible) {
    const row = document.createElement("tr");
    row.className = reservation.status;
    const title = document.createElement("td");
    title.textContent = reservation.title;
    const price = document.createElement("td");
    price.textContent = formatMoney(reservation.unitPrice);
    const seatCell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = "20";
    input.step = "1";
    input.value = reservation.seats;
    input.disabled = reservation.status === "cancelled";
    input.setAttribute("aria-label", "Seats for " + reservation.title);
    input.addEventListener("change", function () {
      handlers.onSeats(reservation.id, input.value);
    });
    seatCell.append(input);
    const status = document.createElement("td");
    status.textContent = reservation.status === "active" ? "Active" : "Canceled";
    const action = document.createElement("td");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = reservation.status === "active" ? "Cancel" : "Restore";
    button.setAttribute("aria-label", button.textContent + " " + reservation.title);
    button.addEventListener("click", function () { handlers.onToggle(reservation.id); });
    action.append(button);
    row.append(title, price, seatCell, status, action);
    list.append(row);
  }
  document.querySelector("#empty-message").hidden = visible.length > 0;
}

export function renderSummary(summary) {
  document.querySelector("#active-seats").textContent = summary.activeSeats;
  document.querySelector("#subtotal").textContent = formatMoney(summary.subtotal);
  document.querySelector("#discount").textContent = formatMoney(summary.discount);
  document.querySelector("#amount-due").textContent = formatMoney(summary.amountDue);
}

export function showMessage(message) {
  document.querySelector("#message").textContent = message;
}
