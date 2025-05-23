import { loadKey } from "../../../storage/loadKey.js";
import { authFetch } from "../general/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
  API_USERS,
} from "/js/utils/source/api/constants.js";

export async function getPosts() {
  const response = await authFetch(API_BASE_URL + API_POSTS);

  if (!response.ok) {
    throw new Error(`Fetching posts failed.`);
  }

  return await response.json();
}

export async function getUserPosts() {
  const author = loadKey("profile");
  const name = author.name;

  const response = await authFetch(`${API_BASE_URL}${API_USERS}/${name}/posts`);

  if (!response.ok) {
    throw new Error(`Fetching posts for user ${name} failed.`);
  }

  return await response.json();
}
