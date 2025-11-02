import { authFetch } from "@/services/api/auth/authFetch";
import { API_BASE_URL, API_POSTS } from "@/services/api/auth/config/constants";

export const searchAllPosts = async (query: string) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}/search?q=${query}&_author=true`,
  );

  if (!response.ok) {
    throw new Error(`Searching in posts failed.`);
  }

  return await response.json();
};
