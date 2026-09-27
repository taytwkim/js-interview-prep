const groupMinimum = 5;
const groupRate = 0.1;

export function formatMoney(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function countSeats(reservations) {
  return reservations.reduce(function (total, reservation) {
    return total + reservation.seats;
  }, 0);
}

function calculateDiscount(subtotal, reservations) {
  const seats = countSeats(reservations);
  return seats >= groupMinimum ? Math.round(subtotal * groupRate) : 0;
}

export function calculateSummary(reservations) {
  const active = reservations.filter(function (reservation) {
    return reservation.status === "active";
  });

  const subtotal = active.reduce(function (total, reservation) {
    return total + reservation.unitPrice * reservation.seats;
  }, 0);

  const discount = calculateDiscount(subtotal, active);

  return {
    activeSeats: countSeats(active),
    subtotal: subtotal,
    discount: discount,
    amountDue: subtotal - discount
  };
}
