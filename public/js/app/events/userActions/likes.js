import { posts } from "/js/utils/source/posts/posts.js";

let LIKES_KEY = "likes";

export function likePosts() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));
  const post = posts.find((p) => p.id == postId);

  const currentLikes = document.getElementById("numb-likes");
  const likesIcon = document.getElementById("likes-icon");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const currentUserId = currentUser?.id;
  if (!currentUserId) return;

  const icon = likesIcon.querySelector("i");
  likesIcon.addEventListener("click", () => {
    const allLikes = JSON.parse(localStorage.getItem(LIKES_KEY)) || {};
    let usersWhoLiked = allLikes[postId] || [];

    const hasLiked = usersWhoLiked.includes(currentUserId);

    if (hasLiked) {
      usersWhoLiked = usersWhoLiked.filter((id) => id !== currentUserId);
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    } else {
      usersWhoLiked.push(currentUserId);
      icon.classList.add("fa-solid");
      icon.classList.remove("fa-regular");
    }

    const previousNumberOfLikes = post.likes;
    currentLikes.textContent = previousNumberOfLikes + usersWhoLiked.length;

    allLikes[postId] = usersWhoLiked;
    localStorage.setItem(LIKES_KEY, JSON.stringify(allLikes));
  });
}
