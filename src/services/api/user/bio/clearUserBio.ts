import { API_BASE_URL, API_USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/authFetch";

export const clearUserBio = async (username: string) => {
  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_USERS}/${username}`,
      {
        method: "PUT",
        body: JSON.stringify({ bio: "" }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating user bio:", errorMessage);
    throw new Error("Deleting profile bio failed.");
  }
};
