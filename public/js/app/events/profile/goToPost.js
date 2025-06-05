export function openPost() {
  const posts = document.querySelectorAll(".user-post");

  posts.forEach((post) => {
    post.addEventListener("click", (e) => {
      const postId = post.dataset.id;

      if (e.target.closest(".edit-post")) return;

      if (postId) {
        window.location.href = `/user/post/?id=${postId}`;
      }
    });
  });
}
