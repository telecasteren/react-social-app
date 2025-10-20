import { API_BASE_URL, API_USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/authFetch";
import { toast } from "react-hot-toast";

export const getSingleUserProfile = async (username: string) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_USERS}/${username}?_posts=true&_followers=true&_following=true`,
  );

  if (!response.ok) {
    toast.error("Could not fetch user.");
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  const { data } = await response.json();
  return data;
};
