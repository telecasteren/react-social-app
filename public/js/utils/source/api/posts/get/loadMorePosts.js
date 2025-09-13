import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";
import { openPost } from "/js/app/events/profile/goToPost.js";

let currentPage = 1;
let isLoading = false;
let isMorePosts = true;

export const loadMorePosts = async (
  fetchMorePosts,
  container,
  renderCallback
) => {
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
    openPost();
  } catch (error) {
    throw error;
  } finally {
    isLoading = false;
  }
};

export const resetPagination = () => {
  currentPage = 1;
  isLoading = false;
  isMorePosts = true;
};
