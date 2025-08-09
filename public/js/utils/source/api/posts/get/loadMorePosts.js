import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";

let currentPage = 1;
let isLoading = false;
let isMorePosts = true;

export async function loadMorePosts(fetchMorePosts, container, renderCallback) {
  if (isLoading || !isMorePosts) return;
  isLoading = true;
  currentPage++;

  try {
    const { data: morePosts } = await fetchMorePosts(
      currentPage,
      POSTS_PER_PAGE
    );
    if (!morePosts || morePosts.length === 0) {
      isMorePosts = false;
      return;
    }

    await renderCallback(morePosts, container);
  } catch (error) {
    console.error("Failed to load more posts:", error);
  } finally {
    isLoading = false;
  }
}

export function resetPagination() {
  currentPage = 1;
  isLoading = false;
  isMorePosts = true;
}
