import { loadKey } from "/js/utils/storage/loadKey.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";

export async function getCurrentUser() {
  const currentUser = loadKey("profile");
  const userName = currentUser.name;
  console.log("User ID:", userName);

  const response = await authFetch(
    `${API_BASE_URL}${API_USERS}/${userName}?_posts=true`
  );

  if (!response.ok) {
    throw new Error(`Fetching user: ${userName} failed.`);
  }

  const user = await response.json();
  return user;
}
