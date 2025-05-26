import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import {
  defaultPostDesc,
  defaultDescFallback,
  defaultDescriptions,
} from "/js/utils/general/constants.js";

export function getPostId(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export async function setMetaDescriptions() {
  const path = window.location.pathname;
  const { data: posts } = await getPosts();

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
        metaDescription =
          "Foodiegram: The spot to connect with fellow Foodies.";
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
}
