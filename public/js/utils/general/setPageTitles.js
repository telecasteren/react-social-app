import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";
import { SITE_NAME } from "/js/utils/general/constants.js";

const getQueryParams = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const setPageTitles = async () => {
  const path = window.location.pathname;
  const { data: posts } = await getPosts(POSTS_PER_PAGE, 1);

  const pageTitles = {
    "/user/feed/": `Explore | ${SITE_NAME}`,
  };

  let pageTitle = Object.keys(pageTitles).find((key) => path.includes(key))
    ? pageTitles[Object.keys(pageTitles).find((key) => path.includes(key))]
    : `${SITE_NAME} | Dashboard`;

  if (path.includes("/post/")) {
    const postId = getQueryParams("id");

    if (postId) {
      const numericPostId = Number(postId);
      let post = posts.find((p) => p.id === numericPostId);

      if (post) {
        pageTitle = `${post.title} | ${SITE_NAME}` || `Post | ${SITE_NAME}`;
      } else {
        pageTitle = `Post | ${SITE_NAME}`;
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
        pageTitle = `${user} | ${SITE_NAME}` || `Profile | ${SITE_NAME}`;
      } else {
        pageTitle = `Profile | ${SITE_NAME}`;
        console.warn(
          `setPageTitles(): Failed to fetch user with ID ${userId}. Fallback initiated.`
        );
      }
    }
  }

  document.title = pageTitle;
};
