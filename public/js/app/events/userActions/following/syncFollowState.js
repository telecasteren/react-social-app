import { getSingleUserProfile } from "/js/utils/source/api/users/getSingleUser.js";

export const syncFollowState = async (user, currentUser, followBtn) => {
  const username = user.name;
  const currentUsername = currentUser.name;
  const updatedUser = await getSingleUserProfile(username);
  const updatedUsersFollowers = updatedUser.followers;
  const amountOfFollowers = updatedUsersFollowers.length;

  const isFollowing = updatedUsersFollowers.some(
    (f) => f.name === currentUsername
  );

  if (followBtn) {
    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";
  }

  const numberOfFollowers = document.querySelector('[data-label="followers"]');
  if (numberOfFollowers) {
    numberOfFollowers.textContent = amountOfFollowers;
  }

  return isFollowing;
};
