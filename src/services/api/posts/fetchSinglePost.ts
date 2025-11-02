import { authFetch } from "@/services/api/auth/authFetch";
import { API_BASE_URL, API_POSTS } from "@/services/api/auth/config/constants";

export const getSinglePost = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));

  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}/${postId}?_author=true&_comments=true&_reactions=true`,
  );

  if (!response.ok) {
    throw new Error(`Fetching single post failed.`);
  }

  const { data } = await response.json();
  return data;
};
