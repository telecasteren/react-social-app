import { loadMorePosts } from "/js/utils/source/api/posts/get/loadMorePosts.js";

export function createScrollHandler(fetchPosts, renderTarget, renderCallback) {
  return async function scrollEvent() {
    const scrolledToEnd =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

    if (scrolledToEnd) {
      await loadMorePosts(fetchPosts, renderTarget, renderCallback);
    }
  };
}
