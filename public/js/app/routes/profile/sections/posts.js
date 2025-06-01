import { getUserPosts } from "/js/utils/source/api/posts/get/getUserPosts.js";

export default async function Posts() {
  const { data: userPosts } = await getUserPosts();

  const postsList = document.createElement("div");
  postsList.id = "posts-container";
  postsList.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5";

  if (userPosts.length === 0) {
    const message = document.createElement("div");
    message.textContent = "No posts yet.";
    message.className =
      "p-4 text-center text-medium rounded-sm shadow-xl border border-accent-light dark:border-accent-dark";

    postsList.appendChild(message);
    return postsList;
  }

  userPosts.forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.className =
      "user-post relative w-full h-48 flex justify-center items-center cursor-pointer";
    postContainer.setAttribute("data-id", post.id);
    postContainer.dataset.created = post.created;
    postContainer.dataset.likes =
      typeof post._count.reactions === "number" ? post._count.reactions : 0;
    postContainer.dataset.comments = Array.isArray(post.comments)
      ? post._count.comments
      : 0;

    const statsWrapper = document.createElement("div");
    statsWrapper.className =
      "absolute justify-center flex flex-wrap gap-2 bg-white text-black rounded-md p-1";

    const likes = document.createElement("div");
    const numOfLikes = post._count.reactions;
    likes.innerText = `♥️ ${numOfLikes} Likes`;
    statsWrapper.appendChild(likes);

    const comments = document.createElement("div");
    const numOfComments = post._count.comments ? post._count.comments : 0;
    comments.innerText = `💬 ${numOfComments} Comments`;
    statsWrapper.appendChild(comments);

    const postImage = document.createElement("img");
    postImage.src = post.media?.url || "/resources/icons/no-image-icon.webp";
    postImage.alt = post.media?.alt || "Default post image";
    postImage.className = `w-full h-full object-cover rounded-sm border border-gray-300 dark:border-0
      hover:scale-105 md:hover:bg-black md:hover:opacity-50 transition-transform duration-300`;

    postContainer.appendChild(postImage);
    postContainer.appendChild(statsWrapper);
    postsList.appendChild(postContainer);
  });

  return postsList;
}
