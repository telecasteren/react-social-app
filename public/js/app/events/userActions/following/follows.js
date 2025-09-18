import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import { submitFollow } from "/js/utils/source/api/users/actions/submitFollow.js";
import { submitUnfollow } from "/js/utils/source/api/users/actions/submitUnfollow.js";
import { syncFollowState } from "/js/app/events/userActions/following/syncFollowState.js";
import { createFollowButton } from "/js/app/events/userActions/following/createFollowBtn.js";

export const toggleFollowing = async (user) => {
  const followBtn = createFollowButton();
  const currentUser = loadKey("profile");
  const visitedUserName = user.name;

  let isFollowing = await syncFollowState(user, currentUser, followBtn);

  followBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    followBtn.disabled = true;

    try {
      if (!isFollowing) {
        await submitFollow(user);
        userMessage("success", `Started following: ${visitedUserName}`);
      } else {
        await submitUnfollow(user);
        userMessage("info", `Stopped following: ${visitedUserName}`);
      }

      isFollowing = await syncFollowState(user, currentUser, followBtn);
    } catch (error) {
      userMessage("warning", "There was an error updating the follow state.");
      isFollowing = await syncFollowState(user, currentUser, followBtn);

      throw error;
    } finally {
      followBtn.disabled = false;
      setTimeout(clearUserMessage, 10000);
    }
  });

  return followBtn;
};
