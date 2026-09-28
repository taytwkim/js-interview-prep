export function renderLibrary(templates, filters, onEdit) {
  const query = filters.query.trim().toLowerCase();
  const visible = templates.filter(function (template) {
    const matchesText = (template.title + " " + template.body).toLowerCase().includes(query);
    return matchesText && (filters.category === "all" || template.category === filters.category);
  });
  const list = document.querySelector("#template-list");
  list.innerHTML = "";
  for (const template of visible) {
    const card = document.createElement("article");
    card.className = "template-card";
    const heading = document.createElement("div");
    heading.className = "card-heading";
    const title = document.createElement("h3");
    title.textContent = template.title;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary";
    button.textContent = "Edit";
    button.setAttribute("aria-label", "Edit " + template.title);
    button.addEventListener("click", function () { onEdit(template.id); });
    heading.append(title, button);
    const metadata = document.createElement("p");
    metadata.className = "metadata";
    metadata.textContent = "#" + template.id + " · " + template.category;
    const body = document.createElement("p");
    body.className = "reply";
    body.textContent = template.body;
    card.append(heading, metadata, body);
    list.append(card);
  }
  document.querySelector("#visible-count").textContent = visible.length;
  document.querySelector("#total-count").textContent = templates.length;
  document.querySelector("#empty-message").hidden = visible.length > 0;
}
