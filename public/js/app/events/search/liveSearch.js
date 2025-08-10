import { loadKey } from "/js/utils/storage/loadKey.js";

/**
 * Filters visible post cards based on the search query typed in the input with id "default-search".
 * Matches the query against the stored posts' title, body, and author name (case-insensitive).
 * Shows or hides corresponding post elements in the DOM by toggling the "hidden" class.
 *
 * @returns {void} This function does not return a value.
 */
export function liveSearch() {
  const query = document.getElementById("default-search").value;
  const posts = document.querySelectorAll(".user-post");
  const postsInStorage = loadKey("posts");

  postsInStorage.forEach((post) => {
    const postTextContent = [post.title, post.body, post.author.name]
      .join(" ")
      .toLowerCase();

    const matching = postTextContent.includes(query.toLowerCase());

    const postElement = Array.from(posts).find(
      (el) => el.dataset.id === String(post.id)
    );

    if (postElement) {
      postElement.classList.toggle("hidden", !matching);
    }
  });

  // If only wanting to match the text content of the posts in the DOM
  // posts.forEach((post) => {
  //   const matching = post.textContent
  //     .toLowerCase()
  //     .includes(query.toLowerCase());
  //   post.classList.toggle("hidden", !matching);
  // });
}
