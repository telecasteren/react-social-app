import { dateBadge } from "/js/app/routes/profile/singlePost/createBadge.js";
import Comments from "/js/app/routes/profile/singlePost/comments.js";
import { loadKey } from "../../../../utils/storage/loadKey.js";
import { getSinglePost } from "/js/utils/source/api/posts/get/getSinglePost.js";

/**
 * Generates and returns a DOM element representing a detailed view of a single post.
 *
 * @function SinglePost extracts the post ID from the URL query parameters, retrieves the corresponding
 * post and author data, and dynamically creates a card layout displaying:
 * - Post image, title, caption, and metadata
 * - Author's avatar and profile link
 * - Number of likes (using localStorage if available)
 * - Comments section (rendered via the `Comments()` component)
 *
 * It also applies styling and layout consistent with Tailwind CSS utility classes.
 *
 * @returns {HTMLElement} A container <div> element with the complete single post UI,
 *                        including post details and comments.
 */
export default async function SinglePost() {
  const post = await getSinglePost();

  const userId = post.author.name || "Unknown author";
  const author = userId;

  const cardContainer = document.createElement("div");
  cardContainer.className =
    "flex flex-column flex-wrap justify-center mt-5 w-[100vw]";

  const card = document.createElement("div");
  card.className = `max-w-sm w-full bg-white border border-gray-200 rounded-l-sm
    shadow-sm dark:bg-[#0f0c29] dark:border-none`;

  const image = document.createElement("img");
  image.className = "rounded-l-sm w-full h-68 object-cover";
  image.src = post.media?.url || "/resources/icons/no-image-icon.webp";
  image.alt = post.media?.alt || "Default post image";

  const contentDiv = document.createElement("div");
  contentDiv.className = "p-5";

  const userContainer = document.createElement("div");
  userContainer.className = "flex flex-wrap items-center justify-between mb-2";

  const authorContainer = document.createElement("div");
  authorContainer.className = "flex flex-wrap items-center gap-2";

  const authorIMG = document.createElement("img");
  authorIMG.setAttribute("data-userId", author);
  authorIMG.className =
    "w-8 h-8 object-cover rounded-full border border-accent-light dark:border-accent-dark";
  authorIMG.src = post.author.avatar.url;
  authorIMG.alt = post.author.avatar.alt;
  authorContainer.appendChild(authorIMG);

  const linkTitle = document.createElement("a");
  linkTitle.href = `/user/profile/?id=${author}`;
  const authorName = document.createElement("h5");
  authorName.setAttribute("data-userId", author);
  authorName.className = `text-2xl tracking-tight text-gray-900 dark:text-gray-200
  hover:text-accent-light hover:dark:text-accent-dark flex-grow`;
  authorName.textContent = author.name;
  linkTitle.appendChild(authorName);
  authorContainer.appendChild(linkTitle);

  const actionContainer = document.createElement("div");
  actionContainer.className = "flex flex-wrap gap-2 items-center justify-end";

  const LIKES_KEY = "likes";
  const allLikes = JSON.parse(localStorage.getItem(LIKES_KEY)) || {};
  const usersWhoLiked = allLikes[post.id] || [];

  const currentUser = loadKey("profile");
  const currentUserId = currentUser?.name;

  const hasLiked = currentUser && usersWhoLiked.includes(currentUserId);
  const likeCount = post.likes + usersWhoLiked.length;

  const likes = document.createElement("div");
  likes.id = "likes-icon";
  likes.innerHTML = `<i class="${
    hasLiked ? "fa-solid" : "fa-regular"
  } fa-heart cursor-pointer" style="color: var(--accent)"></i>`;
  actionContainer.appendChild(likes);

  const numbOfLikes = document.createElement("div");
  numbOfLikes.id = "numb-likes";
  numbOfLikes.textContent = likeCount;
  actionContainer.appendChild(numbOfLikes);

  const title = document.createElement("h5");
  title.className =
    "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
  title.textContent = post.title;

  const paragraph = document.createElement("p");
  paragraph.className = "mb-3 font-normal text-gray-700 dark:text-gray-400";
  paragraph.textContent = post.body;

  userContainer.appendChild(authorContainer);
  userContainer.appendChild(actionContainer);

  contentDiv.appendChild(userContainer);
  contentDiv.appendChild(title);
  contentDiv.appendChild(paragraph);

  if (post.createdAt) {
    const createdDate = dateBadge(
      new Date(post.createdAt),
      "gray-100",
      "gray-100",
      "gray-500"
    );
    contentDiv.appendChild(createdDate);
  }

  const commentSection = document.createElement("div");
  commentSection.className = `border border-solid border-gray-200 dark:border-[#0f0c29]
  pt-8 pr-5 pb-5 pl-5 w-96 rounded-r-sm`;

  const comment = await Comments();
  commentSection.appendChild(comment);

  card.appendChild(image);
  card.appendChild(contentDiv);
  cardContainer.appendChild(card);
  cardContainer.appendChild(commentSection);

  return cardContainer;
}
