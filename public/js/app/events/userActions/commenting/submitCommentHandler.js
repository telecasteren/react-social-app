import { submitComment } from "/js/utils/source/api/posts/comments/submitComment.js";
import { userMessage } from "/js/utils/messages/userMessage.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";

export async function submitCommentHandler() {
  const postId = getPostParams();
  const post = Number(postId);

  const authorName = document.getElementById("author-name");
  const commentTextarea = document.getElementById("comment-message");

  const commentData = {
    postId: post,
    replyToId: null,
    owner: authorName?.value ?? authorName?.textContent ?? "",
    body: commentTextarea.value,
    created: new Date().toISOString(),
  };

  try {
    const response = await submitComment(commentData);
    userMessage("success", "Comment submitted.");

    window.location.reload();
    return response.data;
  } catch (error) {
    userMessage("error", "Failed to create comment.");
    throw new Error("Submitting comment failed");
  }
}
