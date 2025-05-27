import { getSinglePost } from "/js/utils/source/api/posts/get/getSinglePost.js";
import { submitReaction } from "/js/utils/source/api/posts/actions/submitReaction.js";

let LIKES_KEY = "likes";

export async function likePosts() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));
  const post = await getSinglePost(postId);

  const currentLikes = document.getElementById("numb-likes");
  const likesIcon = document.getElementById("likes-icon");

  const currentUser = JSON.parse(localStorage.getItem("profile"));
  const currentUserId = currentUser?.name || "";
  if (!currentUserId) return;

  const icon = likesIcon.querySelector("i");
  likesIcon.addEventListener("click", async () => {
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

      try {
        await submitReaction(postId);
      } catch (error) {
        console.error("Failed to submit reaction:", error);
      }
    }

    const previousNumberOfLikes = post._count.reactions;
    currentLikes.textContent = previousNumberOfLikes + usersWhoLiked.length;

    allLikes[postId] = usersWhoLiked;
    localStorage.setItem(LIKES_KEY, JSON.stringify(allLikes));
  });
}
