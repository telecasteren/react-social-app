import { authFetch } from "@/services/api/auth/authFetch";
import { API_BASE_URL, API_USERS } from "@/services/api/auth/config/constants";
import { toast } from "react-hot-toast";
import type { Profile } from "@/utils/types/user/profile";

export const submitFollow = async (user: Profile) => {
  const username = user.name;

  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_USERS}/${username}/follow`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();

      let message = "Unknown error occurred";
      if (Array.isArray(errorData.errors)) {
        message =
          errorData.errors[0]?.message || JSON.stringify(errorData.errors);
      }
      toast(message);
      throw new Error(message);
    }

    return { success: true };
  } catch (error) {
    toast.error(
      "An error occurred when you tried to follow this user. Please try again.",
    );
    throw error;
  }
};
