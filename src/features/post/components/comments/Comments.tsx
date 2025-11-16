import { Link } from "@tanstack/react-router";
import { formatDate } from "@/services/helpers/formatDate";
import type { Comment } from "@/utils/types/post/comment";
import { deleteComment } from "@/services/api/posts/comments/deleteComment";
import { useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const commentId = comment.id;
  const createdAt = comment.created;
  const commentBody = comment.body;
  const authorName = comment.author?.name || "Unknown Author";
  const avatarImg = comment.author?.avatar?.url;
  const avatarAlt = comment.author?.avatar?.alt || "User avatar";

  return (
    <div
      id="comment-container"
      data-comment-id={commentId}
      className="flex flex-wrap items-center gap-x-2"
    >
      <img
        className="w-8 h-8 rounded-full object-cover border border-accent-light dark:border-accent-dark"
        src={avatarImg}
        alt={avatarAlt}
      />

      <div className="flex flex-col ml-[42px] w-full max-w-[320px] leading-1.5">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Link to="/user/profile/$username" params={{ username: authorName }}>
            <span className="text-sm font-semibold text-gray-900 dark:text-white hover:text-accent-light hover:dark:text-accent-dark">
              {authorName}
            </span>
          </Link>
        </div>

        <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">
          {commentBody}
        </p>

        <span className="text-tiny font-normal text-gray-500 dark:text-gray-400">
          Delivered {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

interface CommentsProps {
  comments: Comment[];
  postId: number;
}

const Comments = ({ comments, postId }: CommentsProps) => {
  const [commentList, setCommentList] = useState(comments);
  const {
    auth: { user, isAuthenticated },
  } = useAuth();

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment({ postId, commentId });
    setCommentList((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId),
    );
  };

  return (
    <div
      id="comments-container"
      className="commentsContainer flex flex-col gap-2"
      data-post-id={postId}
    >
      {commentList.map((comment, index) => {
        const isCommentOwner = comment.author?.name === user?.name;

        return (
          <div key={comment.id} className="flex gap-1 flex-col">
            {index > 0 && (
              <hr className="border-solid border-gray-200 dark:border-[#0f0c29] my-2" />
            )}
            <CommentItem comment={comment} />
            {isAuthenticated && user && isCommentOwner && (
              <button
                className="bg-red-500 text-white text-xs px-2 py-1 m-0 rounded-md self-end"
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
