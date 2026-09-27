export function renderDirectory(model) {
  const body = document.querySelector("#people-rows");
  body.innerHTML = "";
  for (const person of model.rows) {
    const row = document.createElement("tr");
    for (const field of ["name", "email", "team", "location"]) {
      const cell = document.createElement("td");
      cell.textContent = person[field];
      row.append(cell);
    }
    body.append(row);
  }
  document.querySelector("#match-count").textContent = model.total;
  document.querySelector("#empty-message").hidden = model.rows.length > 0;
  document.querySelector("#page-label").textContent = "Page " + model.page + " of " + model.pageCount;
  document.querySelector("#range").textContent = model.rows.length > 0
    ? "Showing " + model.first + "–" + model.last + " of " + model.total
    : "Showing 0 of " + model.total;
  document.querySelector("#previous").disabled = !model.hasPrevious;
  document.querySelector("#next").disabled = !model.hasNext;
}
