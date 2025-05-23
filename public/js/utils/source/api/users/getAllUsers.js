import { authFetch } from "../general/authFetch.js";
import { API_BASE_URL, API_USERS } from "/js/utils/source/api/constants.js";

export async function getAllUsersFromApi() {
  const response = await authFetch(API_BASE_URL + API_USERS);

  if (!response.ok) {
    throw new Error("Fetching users failed.");
  }

  const users = await response.json();
  return users;
}
