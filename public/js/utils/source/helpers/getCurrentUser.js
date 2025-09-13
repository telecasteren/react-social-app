import { loadKey } from "/js/utils/storage/loadKey.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";

export const getCurrentUser = async () => {
  try {
    const currentUser = loadKey("profile");
    const userName = currentUser.name;

    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await authFetch(
      `${API_BASE_URL}${API_USERS}/${userName}?_posts=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.warn("Failed to fetch current user:", response.status);
      return null;
    }

    const data = await response.json();
    return data.data ?? null;
  } catch (error) {
    console.error("getCurrentUser() failed:", error);
    return null;
  }
};
