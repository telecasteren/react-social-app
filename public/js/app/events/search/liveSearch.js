export function liveSearch() {
  const query = document.getElementById("default-search").value;
  const posts = document.querySelectorAll(".user-post");

  posts.forEach((post) => {
    const matching = post.textContent
      .toLowerCase()
      .includes(query.toLowerCase());
    post.classList.toggle("hidden", !matching);
  });
}
