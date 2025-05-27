import { getSinglePost } from "/js/utils/source/api/posts/get/getSinglePost.js";
import { formatDate } from "/js/utils/general/formatDate.js";
import { getPostParams } from "/js/utils/source/helpers/getPostParams.js";

export default async function Comments() {
  const postId = getPostParams("id");
  const post = await getSinglePost(postId);

  const commentsContainer = document.createElement("div");
  commentsContainer.className = "flex flex-col gap-4";

  if (!post || !Array.isArray(post.comments) || post.comments.length === 0) {
    const info = document.createElement("div");
    info.textContent = "Be the first to comment on this post!";
    info.className =
      "p-2 text-center text-[12px] rounded-sm shadow-md border border-accent-light dark:border-accent-dark";

    commentsContainer.appendChild(info);

    return commentsContainer;
  }

  post.comments.forEach(async (comment) => {
    const container = document.createElement("div");
    container.className = "flex flex-wrap items-center gap-x-2";

    const img = document.createElement("img");
    img.className =
      "w-8 h-8 rounded-full object-cover border border-accent-light dark:border-accent-dark";
    img.src = comment.author.avatar.url || "/resources/icons/no-avatar-img.jpg";
    img.alt = comment.author.avatar.alt || "No profile image found.";

    const textContainer = document.createElement("div");
    textContainer.className =
      "flex flex-col ml-[42px] w-full max-w-[320px] leading-1.5";

    const header = document.createElement("div");
    header.className = "flex items-center space-x-2 rtl:space-x-reverse";

    const nameSpan = document.createElement("span");
    nameSpan.className = "text-sm font-semibold text-gray-900 dark:text-white";
    nameSpan.textContent = comment.author.name || "Unknown User";
    header.appendChild(nameSpan);

    const timeSpan = document.createElement("span");
    timeSpan.className =
      "text-tiny font-normal text-gray-500 dark:text-gray-400";
    timeSpan.textContent = `Delivered ${formatDate(comment.created)}`;

    const message = document.createElement("p");
    message.className =
      "text-sm font-normal py-2 text-gray-900 dark:text-white";
    message.textContent = comment.body;

    textContainer.appendChild(message);
    textContainer.appendChild(timeSpan);

    container.appendChild(img);
    container.appendChild(header);
    container.appendChild(textContainer);

    commentsContainer.appendChild(container);
  });

  return commentsContainer;
}
