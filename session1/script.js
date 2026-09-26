const form = document.querySelector("#item-form");
const nameInput = document.querySelector("#item-name");
const quantityInput = document.querySelector("#item-quantity");
const formMessage = document.querySelector("#form-message");
const remainingOnly = document.querySelector("#remaining-only");
const list = document.querySelector("#shopping-list");
const emptyMessage = document.querySelector("#empty-message");
const totalQuantity = document.querySelector("#total-quantity");

const items = [
  { name: "Apples", quantity: 2, bought: false },
  { name: "Bread", quantity: 1, bought: true }
];

function addItem(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const quantity = quantityInput.value;

  if (name === "") {
    formMessage.textContent = "Please enter an item name.";
    return;
  }

  if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) {
    formMessage.textContent = "Please enter a positive whole number.";
    return;
  }

  items.push({ name: name, quantity: Number(quantity), bought: false });
  nameInput.value = "";
  quantityInput.value = "1";
  formMessage.textContent = "";
  renderItems();
}

function toggleBought(index) {
  items[index].bought = !items[index].bought;
  renderItems();
}

function removeItem(index) {
  items.splice(index, 1);
  renderItems();
}

function renderItems() {
  list.innerHTML = "";
  let total = 0;
  let visibleCount = 0;

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    total += item.quantity;

    if (remainingOnly.checked && item.bought) {
      continue;
    }

    const row = document.createElement("li");
    row.className = item.bought ? "bought" : "";

    const text = document.createElement("span");
    text.className = "item-text";
    text.textContent = item.name + " — quantity: " + item.quantity;

    const boughtLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.bought;
    checkbox.addEventListener("change", function () {
      toggleBought(index);
    });
    boughtLabel.append(checkbox, " Bought");

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      removeItem(index);
    });

    row.append(text, boughtLabel, removeButton);
    list.append(row);
    visibleCount++;
  }

  totalQuantity.textContent = total;
  emptyMessage.hidden = visibleCount > 0;
}

form.addEventListener("submit", addItem);
remainingOnly.addEventListener("change", renderItems);

renderItems();
