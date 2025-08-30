import { submitComment } from "/js/utils/source/api/posts/comments/submitComment.js";
import { userMessage } from "/js/utils/messages/userMessage.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";
// import { commentHtml } from "/js/app/routes/profile/singlePost/comments/commentHtml.js";
import { commentBlock } from "/js/utils/source/helpers/commentBlock.js";

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
    console.log("submitComment API response:", response);

    userMessage("success", "Comment submitted.");

    const commentsContainer = document.getElementById("comments-container");
    if (commentsContainer) {
      const apiData = response.data;

      const normalizedComment = {
        ...apiData,
        author: { name: apiData.owner },
        avatar: { url: "", alt: "" },
      };
      const { block, line } = await commentBlock(normalizedComment);
      commentsContainer.prepend(line);
      commentsContainer.prepend(block);
    }

    return response.data;
  } catch (error) {
    userMessage("error", "Failed to create comment.");
    throw new Error("Submitting comment failed");
  }
}
