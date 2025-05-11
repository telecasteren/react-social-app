import { posts } from "/js/utils/source/posts/posts.js";
import { dateBadge } from "/js/app/routes/profile/singlePost/createBadge.js";
import Comments from "/js/app/routes/profile/singlePost/comments.js";
import { getAllUsers } from "/js/app/events/authForm/auth/users/userData.js";

export default function SinglePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));
  const post = posts.find((p) => p.id == postId);

  const userId = post.userId;
  const users = getAllUsers();
  const user = users.find((u) => u.id === userId);
  const author = user;

  const cardContainer = document.createElement("div");
  cardContainer.className =
    "flex flex-column flex-wrap justify-center mt-5 w-[100vw]";

  const card = document.createElement("div");
  card.className = `max-w-sm w-full bg-white border border-gray-200 rounded-l-sm
    shadow-sm dark:bg-[#0f0c29] dark:border-none`;

  const image = document.createElement("img");
  image.className = "rounded-l-sm w-full h-68 object-cover";
  image.src = post.imgSrc;
  image.alt = post.imgAlt;

  const contentDiv = document.createElement("div");
  contentDiv.className = "p-5";

  const userContainer = document.createElement("div");
  userContainer.className = "flex flex-wrap items-center justify-between mb-2";

  const authorContainer = document.createElement("div");
  authorContainer.className = "flex flex-wrap items-center gap-2";

  const authorIMG = document.createElement("img");
  authorIMG.setAttribute("data-userId", author.id);
  authorIMG.className =
    "w-8 h-8 object-cover rounded-full border border-accent-light dark:border-accent-dark";
  authorIMG.src = author.avatarSrc;
  authorIMG.alt = author.avatarAlt;
  authorContainer.appendChild(authorIMG);

  const linkTitle = document.createElement("a");
  linkTitle.href = `/user/profile/?id=${post.userId}`;
  const authorName = document.createElement("h5");
  authorName.setAttribute("data-userId", author.id);
  authorName.className = `text-2xl tracking-tight text-gray-900 dark:text-gray-200
  hover:text-accent-light hover:dark:text-accent-dark flex-grow`;
  authorName.textContent = post.username;
  linkTitle.appendChild(authorName);
  authorContainer.appendChild(linkTitle);

  const actionContainer = document.createElement("div");
  actionContainer.className = "flex flex-wrap gap-2 items-center justify-end";

  const likes = document.createElement("div");
  likes.className = "cursor-pointer";
  likes.innerHTML = `<i class="fa-regular fa-heart" style="color: var(--accent)"></i>`;
  actionContainer.appendChild(likes);

  const numbOfLikes = document.createElement("div");
  numbOfLikes.textContent = post.likes;
  actionContainer.appendChild(numbOfLikes);

  const title = document.createElement("h5");
  title.className =
    "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
  title.textContent = post.title;

  const paragraph = document.createElement("p");
  paragraph.className = "mb-3 font-normal text-gray-700 dark:text-gray-400";
  paragraph.textContent = post.caption;

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

  const comment = Comments();
  commentSection.appendChild(comment);

  card.appendChild(image);
  card.appendChild(contentDiv);
  cardContainer.appendChild(card);
  cardContainer.appendChild(commentSection);

  const icon = likes.querySelector("i");
  likes.addEventListener("click", () => {
    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");

    if (icon.classList.contains("fa-solid")) {
      numbOfLikes.textContent = post.likes + 1;
    } else {
      numbOfLikes.textContent = post.likes;
    }
  });

  return cardContainer;
}
