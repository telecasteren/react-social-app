import { authFetch } from "./authFetch.js";
import {
  API_BASE_URL,
  API_AUTH,
  API_REGISTER,
} from "/js/utils/source/api/general/constants.js";

export async function register(name, email, password) {
  const response = await authFetch(API_BASE_URL + API_AUTH + API_REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Registering account failed.");
}
