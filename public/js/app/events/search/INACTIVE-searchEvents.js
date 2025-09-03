// import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
// import { liveSearch } from "/js/app/events/search/liveSearch.js";
// import { setScrollHandler } from "/js/utils/source/helpers/setScrollHandler.js";
// import { createScrollHandler } from "/js/app/events/feed/createScrollHandler.js";
// import { renderCards } from "/js/app/routes/feed/cards/renderCards.js";
// import { resetPagination } from "/js/utils/source/api/posts/get/loadMorePosts.js";

// /**
//  * Sets up search-related event handlers on the search bar element.
//  * Adds a debounced keyup listener on the search input (#default-search) to:
//  * - Trigger live search filtering of posts.
//  * - Disable or enable infinite scroll loading based on whether a search query is active.
//  * - Reset pagination when search is cleared.
//  *
//  * @param {HTMLElement} searchBar - The container that holds the search input.
//  * @param {Array<Object>} Posts - The current array of post objects to be used by scroll and render handlers.
//  *
//  * @returns {void} This function does not return a value.
//  */
// export function searchEvents(searchBar, Posts) {
//   const searchBox = searchBar.querySelector("#default-search");
//   let timer;
//   let typeInterval = 200;

//   const scrollHandler = createScrollHandler(getPosts, Posts, renderCards);
//   setScrollHandler(scrollHandler);

//   let searchIsActive = false;

//   searchBox.addEventListener("keyup", () => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       const query = searchBox.value.trim();

//       searchIsActive = query.length > 0;

//       if (searchIsActive) {
//         setScrollHandler(() => {});
//       } else {
//         resetPagination();
//         setScrollHandler(scrollHandler);
//       }
//       liveSearch();
//     }, typeInterval);
//   });

//   // If liveSearch is only used to match posts in the DOM
//   // searchBox.addEventListener("keyup", () => {
//   //   clearTimeout(timer);
//   //   scrollHandler(() => {});
//   //   timer = setTimeout(liveSearch, typeInterval);
//   // });
// }
