import { createTitle } from "/js/app/components/titles/title.js";
import searchInput from "/js/app/components/search/searchInput.js";
import createPostMenu from "/js/app/routes/feed/newPosts/createPostMenu.js";
import { sortOptions } from "/js/app/components/search/sortOptions.js";
import { liveSearch } from "/js/app/events/search/liveSearch.js";

export default function Feed() {
  const headerContent = document.createElement("div");
  headerContent.className = "feed-header justify-items-center pt-8 gap-16";

  const title = createTitle("Feed me");
  title.classList.add("text-bigger", "m-4");

  const searchBar = searchInput();
  const newPost = createPostMenu();
  const sortMenu = sortOptions();

  headerContent.appendChild(title);
  headerContent.appendChild(searchBar);
  headerContent.appendChild(sortMenu);
  headerContent.appendChild(newPost);

  const searchBox = searchBar.querySelector("#default-search");
  let timer;
  let typeInterval = 200;

  searchBox.addEventListener("keyup", () => {
    clearTimeout(timer);
    timer = setTimeout(liveSearch, typeInterval);
  });

  return headerContent;
}
