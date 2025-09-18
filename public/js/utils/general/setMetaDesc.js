import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import {
  defaultPostDesc,
  defaultDescFallback,
  defaultDescriptions,
  SITE_NAME,
} from "/js/utils/general/constants.js";
import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";

export const getPostId = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const setMetaDescriptions = async () => {
  const path = window.location.pathname;
  const { data: posts } = await getPosts(POSTS_PER_PAGE, 1);

  let matchedKey = Object.keys(defaultDescriptions).find((key) =>
    path.startsWith(key)
  );

  let metaDescription = matchedKey
    ? defaultDescriptions[matchedKey]
    : defaultDescFallback;

  if (path.includes("/post/")) {
    const postId = getPostId("id");

    if (postId) {
      const numericPostId = Number(postId);
      let post = posts.find((p) => p.id === numericPostId);

      if (post) {
        metaDescription = `${post.title} - ${defaultPostDesc}`;
      } else {
        metaDescription = `${SITE_NAME}: The spot to connect with fellow Foodies.`;
        console.warn(
          `setMetaDescriptions(): Failed to fetch post with ID ${postId}. Fallback initiated.`
        );
      }
    }
  }

  let metaTag = document.querySelector("meta[name='description']");
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.setAttribute("name", "description");
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute("content", metaDescription);
};
