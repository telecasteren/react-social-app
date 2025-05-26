import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";

function getQueryParams(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export async function setPageTitles() {
  const path = window.location.pathname;
  const { data: posts } = await getPosts();

  const pageTitles = {
    "/user/feed/": "Foodiegram | Explore",
  };

  let pageTitle = Object.keys(pageTitles).find((key) => path.includes(key))
    ? pageTitles[Object.keys(pageTitles).find((key) => path.includes(key))]
    : "Foodiegram | Dashboard";

  if (path.includes("/post/")) {
    const postId = getQueryParams("id");

    if (postId) {
      const numericPostId = Number(postId);
      let post = posts.find((p) => p.id === numericPostId);

      if (post) {
        pageTitle = `${post.title} | Foodiegram` || "Foodiegram | Post";
      } else {
        pageTitle = "Foodiegram | Post";
        console.warn(
          `setPageTitles(): Failed to fetch post with ID ${postId}. Fallback initiated.`
        );
      }
    }
  }

  if (path.includes("/profile/")) {
    const userId = getQueryParams("id");

    if (userId) {
      const user = userId;

      if (user) {
        pageTitle = `${user} | Foodiegram` || "Foodiegram | Profile";
      } else {
        pageTitle = "Foodiegram | Profile";
        console.warn(
          `setPageTitles(): Failed to fetch user with ID ${userId}. Fallback initiated.`
        );
      }
    }
  }

  document.title = pageTitle;
}
