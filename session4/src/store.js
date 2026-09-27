import { workshops } from "./data.js";

let state = { lines: [] };
const history = [];
const subscribers = [];

export function getState() {
  return state;
}

export function canUndo() {
  return history.length > 0;
}

export function subscribe(callback) {
  subscribers.push(callback);
  return function () {
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
}

function notify() {
  for (const callback of subscribers) callback(state);
}

function remember() {
  history.push(structuredClone(state));
}

export function addWorkshop(id) {
  const workshop = workshops.find(function (item) { return item.id === id; });
  if (!workshop) return;
  remember();
  const existing = state.lines.find(function (line) { return line.id === id; });
  if (existing) {
    existing.quantity++;
  } else {
    state.lines.push({ id: workshop.id, title: workshop.title, price: workshop.price, quantity: 1 });
  }
  notify();
}

export function changeSeats(id, change) {
  const line = state.lines.find(function (item) { return item.id === id; });
  if (!line || line.quantity + change < 1) return;
  remember();
  line.quantity += change;
  notify();
}

export function removeWorkshop(id) {
  if (!state.lines.some(function (line) { return line.id === id; })) return;
  remember();
  state.lines = state.lines.filter(function (line) { return line.id !== id; });
  notify();
}

export function clearPlan() {
  if (state.lines.length === 0) return;
  remember();
  state.lines = [];
  notify();
}

export function undo() {
  if (!canUndo()) return;
  state = history.pop();
  notify();
}
