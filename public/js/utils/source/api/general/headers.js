import { loadKey } from "../../../storage/loadKey.js";

export function headers(hasBody = false) {
  const headers = new Headers();

  const token = loadKey("token");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }

  return headers;
}
