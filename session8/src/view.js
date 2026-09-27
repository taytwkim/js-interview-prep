function money(cents) { return "$" + (cents / 100).toFixed(2); }

export function renderRequests(visible, selectedIds, onSelect) {
  const body = document.querySelector("#request-rows");
  body.innerHTML = "";
  for (const request of visible) {
    const row = document.createElement("tr");
    row.className = selectedIds.includes(request.id) ? "selected" : "";
    const selection = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selectedIds.includes(request.id);
    checkbox.setAttribute("aria-label", "Select " + request.id);
    checkbox.addEventListener("change", function () { onSelect(request.id, checkbox.checked); });
    selection.append(checkbox);
    const description = document.createElement("td");
    const id = document.createElement("span");
    id.className = "request-id";
    id.textContent = request.id;
    description.append(id, request.description);
    row.append(selection, description);
    for (const value of [request.employee, request.category, money(request.amount), request.status === "approved" ? "Approved" : "Pending"]) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }
    body.append(row);
  }
  document.querySelector("#visible-count").textContent = visible.length + " visible requests";
  document.querySelector("#empty-message").hidden = visible.length > 0;
}

export function renderSelection(summary, visibleCount) {
  const checkbox = document.querySelector("#select-visible");
  checkbox.checked = summary.allVisible;
  checkbox.indeterminate = summary.mixed;
  checkbox.disabled = visibleCount === 0;
  document.querySelector("#selected-count").textContent = summary.count;
  document.querySelector("#selected-amount").textContent = money(summary.amount);
  document.querySelector("#approve").disabled = summary.count === 0;
}

export function showMessage(message) { document.querySelector("#message").textContent = message; }
