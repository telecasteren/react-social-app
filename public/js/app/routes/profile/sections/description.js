import { toggleFollowing } from "/js/app/events/userActions/follows.js";
import { loadKey } from "/js/utils/storage/loadKey.js";

export default async function Description(user) {
  const currentUser = loadKey("profile");
  const followBtn = await toggleFollowing(user);

  const userDescription = document.createElement("div");
  userDescription.className = "grid grid-cols-1 mt-16";

  const description = document.createElement("p");
  description.innerText = user.bio || "No bio yet..";
  description.className = "text-sm m-2 justify-self-center";
  userDescription.appendChild(description);

  if (currentUser.name !== user.name && followBtn) {
    userDescription.appendChild(followBtn);
  }

  return userDescription;
}
