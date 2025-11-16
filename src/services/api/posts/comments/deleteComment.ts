import { authFetch } from "@/services/api/auth/authFetch";
import { API_BASE_URL, API_POSTS } from "@/services/api/auth/config/constants";
import { toast } from "react-hot-toast";

interface deleteCommentProps {
  postId: number;
  commentId: number;
}

export const deleteComment = async ({
  postId,
  commentId,
}: deleteCommentProps) => {
  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_POSTS}/${postId}/comment/${commentId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      toast.success("Comment deleted");

      setTimeout(() => toast.dismiss(), 2000);
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    toast.error("Failed to delete your comment. Please try again.");
    throw error;
  }
};
