import { useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import ToggleCommentBtn from "@/features/post/components/comments/ToggleCommentFormBtn";
import { submitComment } from "@/services/api/posts/comments/submitComment";
import type { Post } from "@/utils/types/post/post";
import toast from "react-hot-toast";

interface CommentFormProps {
  postId: Post["id"];
  commentAdded: (commentText: string) => void;
}

const CommentForm = ({ postId, commentAdded }: CommentFormProps) => {
  const {
    auth: { user, isAuthenticated },
  } = useAuth();
  const [isHidden, setIsHidden] = useState(true);
  const [commentMessage, setCommentMessage] = useState("");

  if (!isAuthenticated || !user) {
    return null;
  }

  const currentUserName = user.name || "Unknown user";
  const avatarSrc = user.avatar?.url || "";
  const avatarAlt = user.avatar?.alt || "No profile image found.";

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!commentMessage.trim()) return;

    try {
      commentAdded?.(commentMessage);

      setIsHidden(true);
      setCommentMessage("");

      await submitComment({
        postId,
        commentData: { body: commentMessage },
      });

      toast.success("Comment submitted!");
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
      throw error;
    }
  };

  const handleCancel = () => {
    setIsHidden(true);
    setCommentMessage("");
  };

  const toggleCommentForm = () => {
    setIsHidden(!isHidden);
  };

  return (
    <>
      <ToggleCommentBtn onClick={toggleCommentForm} />
      <div id="comment-form" className={isHidden ? "hidden" : ""}>
        <div
          id="comment-form-container"
          className="commentForm w-full flex flex-col gap-4"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <img
              className="w-8 h-8 rounded-full object-cover border border-accent-light dark:border-accent-dark"
              src={avatarSrc}
              alt={avatarAlt}
            />
            <span
              id="author-name"
              className="text-sm font-semibold text-gray-900 dark:text-white"
            >
              {currentUserName}
            </span>
          </div>
          <textarea
            rows={3}
            id="comment-message"
            value={commentMessage}
            onChange={(e) => setCommentMessage(e.target.value)}
            className="w-full p-2 border border-accent-light dark:border-accent-dark rounded-md dark:bg-[#302b63] text-black dark:text-white hover:scale-[1.01] transition duration-300"
          />

          <div className="flex justify-start mb-6">
            <button
              type="submit"
              id="submit-comment"
              onClick={handleSubmit}
              className="mt-2 px-4 py-2 w-fit text-black bg-accent-light dark:bg-accent-dark rounded-md hover:brightness-110 cursor-pointer"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="ml-4 mt-2 text-sm text-gray-400 hover:text-red-800"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentForm;
