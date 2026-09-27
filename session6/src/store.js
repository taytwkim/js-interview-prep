import { exampleReservations } from "./data.js";

let reservations = structuredClone(exampleReservations);

export function getReservations() {
  return reservations;
}

export function updateSeats(id, rawValue) {
  const seats = Number(rawValue);
  if (!Number.isInteger(seats) || seats < 1 || seats > 20) {
    return "Seats must be a whole number from 1 through 20.";
  }
  const reservation = reservations.find(function (item) { return item.id === id; });
  if (!reservation) return "Reservation not found.";
  reservation.seats = seats;
  return "";
}

export function toggleStatus(id) {
  const reservation = reservations.find(function (item) { return item.id === id; });
  if (!reservation) return;
  reservation.status = reservation.status === "active" ? "cancelled" : "active";
}

export function resetOrder() {
  reservations = structuredClone(exampleReservations);
}
