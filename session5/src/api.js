import { clients } from "./data.js";

export async function fetchBrief(clientId) {
  const delay = clientId === "northstar" ? 1800 : 200;
  await new Promise(function (resolve) { setTimeout(resolve, delay); });
  const client = clients.find(function (item) { return item.id === clientId; });
  if (!client) throw new Error("Client not found");
  return { clientId: client.id, text: client.brief, owner: client.owner, targetDate: client.targetDate };
}
