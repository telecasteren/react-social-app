import { posts } from "/js/utils/source/posts/posts.js";

const postsLookup = posts.reduce((acc, post) => {
  if (!acc[post.userId]) {
    acc[post.userId] = [];
  }
  acc[post.userId].push(post);
  return acc;
}, {});

export default function Posts() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = parseInt(urlParams.get("id"));

  const postsList = document.createElement("div");
  postsList.id = "posts-container";
  postsList.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5";

  if (!postsLookup[userId] || isNaN(userId)) {
    const message = document.createElement("div");
    message.textContent = "No posts yet.";
    message.className =
      "p-4 text-center text-medium rounded-sm shadow-xl border border-accent-light dark:border-accent-dark";

    postsList.appendChild(message);
    return postsList;
  }

  postsLookup[userId].forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.className =
      "user-post relative w-full h-48 flex justify-center items-center cursor-pointer";
    postContainer.setAttribute("data-id", post.id);
    postContainer.dataset.created = post.createdAt;
    postContainer.dataset.likes =
      typeof post.likes === "number" ? post.likes : 0;
    postContainer.dataset.comments = Array.isArray(post.comments)
      ? post.comments.length
      : 0;

    const statsWrapper = document.createElement("div");
    statsWrapper.className =
      "absolute justify-center flex flex-wrap gap-2 bg-white text-black rounded-md p-1";

    const likes = document.createElement("div");
    const numOfLikes = post.likes ? post.likes : 0;
    likes.innerText = `♥️ ${numOfLikes} Likes`;
    statsWrapper.appendChild(likes);

    const comments = document.createElement("div");
    const numOfComments = post.comments ? post.comments.length : 0;
    comments.innerText = `💬 ${numOfComments} Comments`;
    statsWrapper.appendChild(comments);

    const postImage = document.createElement("img");
    postImage.src = post.imgSrc;
    postImage.alt = post.imgAlt;
    postImage.className = `w-full h-full object-cover rounded-sm
      hover:scale-105 md:hover:bg-black md:hover:opacity-50 transition-transform duration-300`;

    postContainer.appendChild(postImage);
    postContainer.appendChild(statsWrapper);
    postsList.appendChild(postContainer);
  });

  return postsList;
}
