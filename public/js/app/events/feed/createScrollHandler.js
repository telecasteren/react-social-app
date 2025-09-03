import { loadMorePosts } from "/js/utils/source/api/posts/get/loadMorePosts.js";

export function createScrollHandler(fetchPosts, renderTarget, renderCallback) {
  const scrolledToEnd =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  return async () => {
    if (scrolledToEnd) {
      await loadMorePosts(fetchPosts, renderTarget, renderCallback);
    }
  };
}
