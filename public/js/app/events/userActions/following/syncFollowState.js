import { getSingleUserProfile } from "/js/utils/source/api/users/getSingleUser.js";

export async function syncFollowState(user, currentUser, followBtn) {
  const updatedUser = await getSingleUserProfile(user.name);

  const isFollowing = updatedUser.followers.some(
    (f) => f.name === currentUser.name
  );

  if (followBtn) {
    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";
  }

  const numberOfFollowers = document.querySelector('[data-label="followers"]');
  if (numberOfFollowers) {
    numberOfFollowers.textContent = updatedUser.followers.length;
  }

  return isFollowing;
}
