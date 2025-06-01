import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import createButton from "/js/app/components/buttons/primaryBtn.js";
import { submitFollow } from "/js/utils/source/api/users/actions/submitFollow.js";
import { submitUnfollow } from "/js/utils/source/api/users/actions/submitUnfollow.js";
import { getSingleUserProfile } from "/js/utils/source/api/users/getSingleUser.js";

export function createFollowButton() {
  const followBtn = createButton({
    text: "Follow.",
    href: "#",
    newTab: false,
  });
  followBtn.classList.add("follow-btn", "btn-secondary", "justify-self-center");

  return followBtn;
}

export async function toggleFollowing(user) {
  const followBtn = createFollowButton();

  const currentUser = loadKey("profile");
  const userData = await getSingleUserProfile(user.name);

  let isFollowing = userData.followers.some(
    (follower) => follower.id === currentUser.id
  );

  followBtn.textContent = isFollowing ? "Unfollow" : "Follow";

  followBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      followBtn.disabled = true;

      const numberOfFollowers = document.querySelector(
        '[data-label="followers"]'
      );
      let count = numberOfFollowers
        ? parseInt(numberOfFollowers.textContent, 10)
        : 0;

      if (!isFollowing) {
        userMessage("success", `You started following: ${user.name}`);
        await submitFollow(user);

        const updatedUserData = await getSingleUserProfile(user.name);
        isFollowing = updatedUserData.followers.some(
          (follower) => follower.id === currentUser.id
        );

        isFollowing = true;
        followBtn.textContent = "Unfollow";

        if (numberOfFollowers) {
          numberOfFollowers.textContent = count + 1;
        }
      } else {
        userMessage("info", `You stopped following: ${user.name}`);
        await submitUnfollow(user);

        const updatedUserData = await getSingleUserProfile(user.name);
        isFollowing = updatedUserData.followers.some(
          (follower) => follower.id === currentUser.id
        );

        isFollowing = false;
        followBtn.textContent = "Follow";

        if (numberOfFollowers) {
          numberOfFollowers.textContent = count - 1;
        }
      }

      setTimeout(clearUserMessage, 10000);
    } catch (error) {
      userMessage("warning", "Error occurred while toggling follow status.");
      console.error("Error in toggleFollowing:", error);
    } finally {
      followBtn.disabled = false;
    }
  });

  return followBtn;
}
