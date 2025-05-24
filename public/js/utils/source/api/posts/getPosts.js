import { loadKey } from "/js/utils/storage/loadKey.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";

export async function getPosts() {
  const response = await authFetch(`${API_BASE_URL}${API_POSTS}?_author=true`);
  console.log(response);

  if (!response.ok) {
    throw new Error(`Fetching posts failed.`);
  }

  return await response.json();
}

export async function getSinglePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));

  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}/${postId}?_author=true&_comments=true&_reactions=true`
  );
  console.log(response);

  if (!response.ok) {
    throw new Error(`Fetching single post failed.`);
  }

  const { data } = await response.json();
  return data;
}

export async function getUserPosts() {
  const activeUser = loadKey("profile");
  const loggedInUsername = activeUser.name;

  const urlParams = new URLSearchParams(window.location.search);
  const currentProfile = urlParams.get("id");

  const profileName =
    currentProfile && currentProfile !== loggedInUsername
      ? currentProfile
      : loggedInUsername;

  const response = await authFetch(
    `${API_BASE_URL}${API_USERS}/${profileName}/posts`
  );

  if (!response.ok) {
    throw new Error(`Fetching posts for user ${profileName} failed.`);
  }

  return await response.json();
}
