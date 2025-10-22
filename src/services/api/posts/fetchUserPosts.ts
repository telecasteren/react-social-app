import { authFetch } from "@/services/api/auth/authFetch";
import {
  API_BASE_URL,
  API_USERS,
  POSTS_PER_PAGE,
} from "@/services/api/auth/config/constants";

export const fetchUserPosts = async (
  limit: number = POSTS_PER_PAGE,
  page: number = 1,
  username?: string,
) => {
  if (!username) {
    throw new Error("Username is required to fetch user posts.");
  }

  const url = `${API_BASE_URL}${API_USERS}/${username}/posts/?limit=${limit}&page=${page}`;
  const response = await authFetch(url);

  if (!response.ok) {
    throw new Error(`Fetching posts for user ${username} failed.`);
  }

  const { data: userPosts } = await response.json();
  return userPosts;
};
