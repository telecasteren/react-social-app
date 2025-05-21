import { authFetch } from "../general/authFetch.js";
import { API_BASE_URL, API_POSTS } from "/js/utils/source/api/constants.js";

export async function getPosts() {
  const response = await authFetch(API_BASE_URL + API_POSTS);
  return await response.json();
}
