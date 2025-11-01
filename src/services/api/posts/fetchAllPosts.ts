import { authFetch } from "@/services/api/auth/authFetch";
import {
  API_BASE_URL,
  API_POSTS,
  POSTS_PER_PAGE,
} from "@/services/api/auth/config/constants";

export const fetchAllPosts = async (limit = POSTS_PER_PAGE, page = 1) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}?_author=true&_comments=true&limit=${limit}&page=${page}`,
  );

  if (!response.ok) {
    throw new Error(`Fetching posts failed.`);
  }

  return await response.json();
};
