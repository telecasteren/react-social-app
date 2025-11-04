import { authFetch } from "@/services/api/auth/authFetch";
import { API_BASE_URL, API_POSTS } from "@/services/api/auth/config/constants";

export const fetchSinglePost = async (postId: string) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}/${postId}?_author=true&_comments=true&_reactions=true`,
  );

  if (!response.ok) {
    throw new Error(`Fetching single post failed.`);
  }

  const { data } = await response.json();
  return data;
};
