import { getSinglePost } from "/js/utils/source/api/posts/get/getSinglePost.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";
import { commentBlock } from "/js/utils/source/helpers/commentBlock.js";

export default async function Comments() {
  const postId = getPostParams("id");
  const post = await getSinglePost(postId);

  const commentsContainer = document.createElement("div");
  commentsContainer.id = "comments-container";
  commentsContainer.className = "commentsContainer flex flex-col gap-2";
  commentsContainer.setAttribute("data-post-id", postId);

  post.comments.forEach(async (comment) => {
    const { block, line } = await commentBlock(comment);
    commentsContainer.appendChild(line);
    commentsContainer.appendChild(block);
  });

  return commentsContainer;
}
