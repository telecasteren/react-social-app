import { authFetch } from "@/services/api/auth/authFetch";
import { API_BASE_URL, API_POSTS } from "@/services/api/auth/config/constants";
import { toast } from "react-hot-toast";

interface CommentInput {
  body: string;
}

interface submitCommentProps {
  postId: number;
  commentData: CommentInput;
}

export const submitComment = async ({
  postId,
  commentData,
}: submitCommentProps) => {
  const response = await authFetch(
    `${API_BASE_URL}${API_POSTS}/${postId}/comment`,
    {
      method: "POST",
      body: JSON.stringify(commentData),
    },
  );

  if (!response.ok) {
    toast.error("Failed to submit comment. Please try again.");
    throw new Error("Failed to submit comment");
  }

  return await response.json();
};
