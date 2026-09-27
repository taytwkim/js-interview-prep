import { workshops } from "./data.js";

function wait(milliseconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, milliseconds);
  });
}

export async function searchWorkshops(query) {
  const normalized = query.trim().toLowerCase();
  const delay = normalized.length === 1 ? 1200 : 200;
  await wait(delay);

  return workshops
    .filter(function (workshop) {
      return workshop.title.toLowerCase().includes(normalized);
    })
    .map(function (workshop) {
      return { ...workshop };
    }); 
}
