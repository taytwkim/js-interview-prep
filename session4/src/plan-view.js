const plan = document.querySelector("#plan");

function actionButton(label, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "secondary";
  button.textContent = label;
  button.dataset.action = action;
  button.dataset.workshopId = id;
  return button;
}

export function bindPlanActions(handlers) {
  plan.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");
    if (!button || !plan.contains(button) || button.disabled) return;
    const id = button.dataset.workshopId;
    if (button.dataset.action === "increase") handlers.onChange(id, 1);
    if (button.dataset.action === "decrease") handlers.onChange(id, -1);
    if (button.dataset.action === "remove") handlers.onRemove(id);
  });
  document.querySelector("#undo").addEventListener("click", handlers.onUndo);
  document.querySelector("#clear-plan").addEventListener("click", handlers.onClear);
}

export function renderPlan(state, hasHistory) {
  plan.innerHTML = "";
  let total = 0;
  let seats = 0;

  for (const line of state.lines) {
    const row = document.createElement("article");
    row.className = "plan-line";
    const heading = document.createElement("div");
    heading.className = "line-heading";
    const title = document.createElement("strong");
    title.textContent = line.title;
    const subtotal = document.createElement("span");
    subtotal.textContent = "$" + line.price * line.quantity;
    heading.append(title, subtotal);

    const details = document.createElement("p");
    details.textContent = "$" + line.price + " per seat";
    const controls = document.createElement("div");
    controls.className = "seat-controls";
    const decrease = actionButton("−", "decrease", line.id);
    decrease.disabled = line.quantity === 1;
    decrease.setAttribute("aria-label", "Remove one seat for " + line.title);
    const quantity = document.createElement("span");
    quantity.textContent = line.quantity + " seat(s)";
    const increase = actionButton("+", "increase", line.id);
    increase.setAttribute("aria-label", "Add one seat for " + line.title);
    const remove = actionButton("Remove", "remove", line.id);
    remove.classList.add("remove");
    remove.setAttribute("aria-label", "Remove " + line.title + " from plan");
    controls.append(decrease, quantity, increase, remove);
    row.append(heading, details, controls);
    plan.append(row);
    seats += line.quantity;
    total += line.price * line.quantity;
  }

  document.querySelector("#plan-empty").hidden = state.lines.length > 0;
  document.querySelector("#seat-count").textContent = seats;
  document.querySelector("#plan-total").textContent = "$" + total;
  document.querySelector("#undo").disabled = !hasHistory;
  document.querySelector("#clear-plan").disabled = state.lines.length === 0;
}
