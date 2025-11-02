import { authFetch } from "@/services/api/auth/authFetch";
import { API_BASE_URL, API_USERS } from "@/services/api/auth/config/constants";

export const queryProfiles = async (query: string) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_USERS}/search?q=${query}&_posts=true`,
  );

  if (!response.ok) {
    throw new Error(`Searching for profiles failed.`);
  }

  return await response.json();
};
