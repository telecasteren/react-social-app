import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

export async function getPosts() {
  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}?_author=true&_comments=true`
  );

  if (!response.ok) {
    throw new Error(`Fetching posts failed.`);
  }

  return await response.json();
}
