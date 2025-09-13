import { commentHtml } from "/js/app/routes/profile/singlePost/comments/commentHtml.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { deleteComment } from "/js/utils/source/api/posts/comments/deleteComment.js";

export const commentBlock = async (comment) => {
  const currentUser = await getCurrentUser();

  const lineEl = document.createElement("hr");
  lineEl.className = "border-solid border-gray-200 dark:border-[#0f0c29] my-2";

  const singleCommentContainer = document.createElement("div");
  singleCommentContainer.className = "flex flex-col";

  const commentEl = commentHtml(comment);
  singleCommentContainer.appendChild(commentEl);

  if (currentUser.name === comment.author.name) {
    const deleteCommentBtn = document.createElement("button");
    deleteCommentBtn.className =
      "bg-red-500 text-white text-xs px-2 py-1 m-0 rounded-md self-end";
    deleteCommentBtn.textContent = "Delete";

    deleteCommentBtn.addEventListener("click", async () => {
      try {
        await deleteComment(comment.id);
        singleCommentContainer.remove();
        lineEl.remove();
      } catch (error) {
        throw new Error("Error deleting comment");
      }
    });

    singleCommentContainer.appendChild(deleteCommentBtn);
  }

  return { block: singleCommentContainer, line: lineEl };
};
