import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";

export async function queryProfiles(query) {
  const response = await authFetch(
    `${API_BASE_URL}${API_USERS}/search?q=${query}&_posts=true`
  );

  if (!response.ok) {
    throw new Error(`Searching for profiles failed.`);
  }

  return await response.json();
}
