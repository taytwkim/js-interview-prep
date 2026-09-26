const searchInput = document.querySelector("#search");
const maxPriceSelect = document.querySelector("#max-price");
const availabilitySelect = document.querySelector("#availability");
const clearButton = document.querySelector("#clear-filters");
const menuList = document.querySelector("#menu-list");
const resultCount = document.querySelector("#result-count");
const emptyMessage = document.querySelector("#empty-message");

const dishes = [
  { name: "Tomato Soup", price: 6, available: true },
  { name: "Garden Salad", price: 8, available: false },
  { name: "Chicken Wrap", price: 12, available: true },
  { name: "Veggie Wrap", price: 10, available: true },
  { name: "Pasta Bowl", price: 14, available: false },
  { name: "Cheese Toastie", price: 8, available: true }
];

function getMatchingDishes() {
  const search = searchInput.value.trim().toLowerCase();
  const maxPrice = maxPriceSelect.value;
  const availability = availabilitySelect.value;
  const matches = [];

  for (let i = 0; i < dishes.length; i++) {
    const dish = dishes[i];
    const matchesSearch = dish.name.toLowerCase().includes(search);
    const matchesPrice = maxPrice === "all" || dish.price <= Number(maxPrice);
    const matchesAvailability = availability === "all" || dish.available;

    if (matchesSearch && matchesPrice && matchesAvailability) {
      matches.push(dish);
    }
  }

  return matches;
}

function renderMenu() {
  const matches = getMatchingDishes();
  menuList.innerHTML = "";

  for (let i = 0; i < matches.length; i++) {
    const dish = matches[i];
    const row = document.createElement("li");

    const name = document.createElement("span");
    name.className = "dish-name";
    name.textContent = dish.name;

    const price = document.createElement("span");
    price.textContent = "$" + dish.price;

    const status = document.createElement("span");
    status.className = "dish-status";
    status.textContent = dish.available ? "Available now" : "Sold out";

    row.append(name, price, status);
    menuList.append(row);
  }

  resultCount.textContent = matches.length;
  emptyMessage.hidden = matches.length > 0;
}

function clearFilters() {
  searchInput.value = "";
  maxPriceSelect.value = "all";
  availabilitySelect.value = "all";
  renderMenu();
}

searchInput.addEventListener("input", renderMenu);
maxPriceSelect.addEventListener("change", renderMenu);
availabilitySelect.addEventListener("change", renderMenu);
clearButton.addEventListener("click", clearFilters);

clearFilters();
