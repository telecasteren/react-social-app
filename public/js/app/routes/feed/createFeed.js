import { createTitle } from "/js/app/components/titles/title.js";
import searchInput from "/js/app/components/search/searchInput.js";
import createPostMenu from "/js/app/routes/feed/newPosts/createPostMenu.js";
import { sortOptions } from "/js/app/components/search/sortOptions.js";
import { liveSearch } from "/js/app/events/search/liveSearch.js";
import { createCards } from "/js/app/routes/feed/cards/cards.js";
import { resetPagination } from "/js/utils/source/api/posts/get/loadMorePosts.js";
import { setScrollHandler } from "/js/utils/source/helpers/setScrollHandler.js";
import { createScrollHandler } from "/js/app/events/feed/createScrollHandler.js";
import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { renderCards } from "/js/app/routes/feed/cards/renderCards.js";

export default async function Feed() {
  const container = document.createElement("div");
  const headerContent = document.createElement("div");
  headerContent.className = "feed-header justify-items-center pt-8 gap-16";

  resetPagination();

  const title = createTitle("Feed me");
  title.classList.add("text-bigger", "m-4");

  const searchBar = searchInput();
  const newPost = createPostMenu();
  const sortMenu = sortOptions();
  const Posts = await createCards();

  headerContent.appendChild(title);
  headerContent.appendChild(searchBar);
  headerContent.appendChild(sortMenu);
  headerContent.appendChild(newPost);

  container.appendChild(headerContent);
  container.appendChild(Posts);

  const searchBox = searchBar.querySelector("#default-search");
  let timer;
  let typeInterval = 200;

  searchBox.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(liveSearch, typeInterval);
  });

  const scrollHandler = createScrollHandler(getPosts, Posts, renderCards);
  setScrollHandler(scrollHandler);

  return container;
}
