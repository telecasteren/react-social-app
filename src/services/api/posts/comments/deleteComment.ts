import { authFetch } from "@/services/api/auth/authFetch";
import { getPostParams } from "@/services/helpers/getPostParams";
import { API_BASE_URL, API_POSTS } from "@/services/api/auth/config/constants";
import { toast } from "react-hot-toast";

interface deleteCommentProps {
  commentId: number;
}

export const deleteComment = async ({ commentId }: deleteCommentProps) => {
  const { id: postId } = getPostParams();

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
      toast.success("Comment deleted successfully");

      setTimeout(() => toast.dismiss(), 2000);
      return null;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    toast.error("Failed to delete your comment. Please try again.");
    console.error(
      `deleteComment(): couldn't delete comment: ${commentId}, "Error:" ${error.message}`,
    );
    return;
  }
};
