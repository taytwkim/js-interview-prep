const catalog = document.querySelector("#catalog");
const status = document.querySelector("#search-status");
const empty = document.querySelector("#catalog-empty");

export function showLoading() {
  status.textContent = "Searching workshops…";
  catalog.setAttribute("aria-busy", "true");
}

export function showSearchError() {
  status.textContent = "Could not load workshops. Try searching again.";
  catalog.setAttribute("aria-busy", "false");
}

export function renderCatalog(workshops, onAdd) {
  catalog.innerHTML = "";
  catalog.setAttribute("aria-busy", "false");
  status.textContent = workshops.length + " workshop(s) found";
  empty.hidden = workshops.length > 0;

  for (const workshop of workshops) {
    const card = document.createElement("article");
    card.className = "workshop";
    const title = document.createElement("h3");
    title.textContent = workshop.title;
    const details = document.createElement("p");
    details.textContent = workshop.category + " · " + workshop.duration;
    const footer = document.createElement("div");
    footer.className = "workshop-footer";
    const price = document.createElement("strong");
    price.textContent = "$" + workshop.price + " / seat";
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.workshopId = workshop.id;
    button.textContent = "Add to plan";
    button.setAttribute("aria-label", "Add " + workshop.title + " to plan");
    footer.append(price, button);
    card.append(title, details, footer);
    catalog.append(card);
  }
}

export function bindCatalogActions(onAdd) {
  catalog.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-workshop-id]");
    if (!button || !catalog.contains(button)) return;
    onAdd(button.dataset.workshopId);
  });
}
