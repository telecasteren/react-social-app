import { authFetch } from "@/services/api/auth/authFetch";
import { API_BASE_URL, API_POSTS } from "@/services/api/auth/config/constants";
import { toast } from "react-hot-toast";

export const submitReaction = async (postId: number) => {
  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_POSTS}/${postId}/react/❤️`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    toast.error("An error occurred when clicking like. Please try again.");
    throw error;
  }
};
