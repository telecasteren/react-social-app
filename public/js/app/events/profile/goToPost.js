export const openPost = () => {
  const posts = document.querySelectorAll(".user-post");

  posts.forEach((post) => {
    post.addEventListener("click", (e) => {
      const postId = post.dataset.id;
      const cameFrom = window.location.pathname + window.location.search;
      const scrollY = window.scrollY || 0;

      if (e.target.closest(".edit-post")) return;

      sessionStorage.setItem(
        "previousPage",
        JSON.stringify({
          cameFrom,
          scrollY,
        })
      );

      if (postId) {
        window.location.href = `/user/post/?id=${postId}`;
      }
    });
  });
};
