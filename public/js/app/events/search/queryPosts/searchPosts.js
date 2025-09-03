import { loadKey } from "/js/utils/storage/loadKey.js";
import { renderCards } from "/js/app/routes/feed/cards/renderCards.js";
import { queryPosts } from "/js/utils/source/api/posts/search/queryPosts.js";
import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { openPost } from "/js/app/events/profile/goToPost.js";
import {
  setScrollHandler,
  removeScrollHandler,
} from "/js/utils/source/helpers/setScrollHandler.js";
import { createScrollHandler } from "/js/app/events/feed/createScrollHandler.js";
import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";

export async function searchPosts(searchBar, container) {
  const searchBox = searchBar.querySelector("#default-search");
  const button = searchBar.querySelector("#search-btn");
  const posts = loadKey("posts");

  if (!searchBox || !button || !container) {
    console.error("Search elements not found"); // ===== DEBUGGING
    return;
  }

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    removeScrollHandler(window._scrollHandler);

    const query = searchBox.value.trim();

    if (!query) {
      userMessage("info", "Search cannot be empty. Please enter search words.");
      return;
    }

    try {
      const results = await queryPosts(query);

      if (Array.isArray(results.data) && results.data.length > 0) {
        container.innerHTML = "";
        renderCards(results.data, container);
        openPost();
      } else {
        container.innerHTML = "";
        userMessage("info", "That search returned no results.");
        setTimeout(() => {
          searchBox.value = "";
          renderCards(posts, container);
          clearUserMessage();
        }, 5000);
      }
    } catch (error) {
      userMessage("error", "Failed to search posts. Please try again.");
      throw error;
    } finally {
      setTimeout(() => clearUserMessage(), 3000);
    }
  });

  setScrollHandler(createScrollHandler(getPosts, container, renderCards));
}
