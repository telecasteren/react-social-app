import { getUserPosts } from "/js/utils/source/api/posts/get/getUserPosts.js";
import { renderPosts } from "/js/app/routes/profile/sections/posts/renderPosts.js";

const Posts = async (limit, page = 1) => {
  const { data: userPosts } = await getUserPosts(limit, page);

  const postsList = document.createElement("div");
  postsList.id = "posts-container";
  postsList.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5";

  if (userPosts.length === 0 && page === 1) {
    const message = document.createElement("div");
    message.textContent = "No posts yet.";
    message.className =
      "p-4 w-fit text-center text-sm rounded-sm shadow-xl border border-accent-light dark:border-accent-dark";
    postsList.appendChild(message);

    return postsList;
  }

  await renderPosts(userPosts, postsList);
  return postsList;
};
export default Posts;
