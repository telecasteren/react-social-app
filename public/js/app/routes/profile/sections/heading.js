import { createTitle } from "/js/app/components/titles/title.js";
import { getAllUsers } from "/js/app/events/authForm/auth/users/userData.js";

export default function Heading() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = parseInt(urlParams.get("id"));
  const user = getAllUsers().find((u) => u.id === userId);

  const userHeading = document.createElement("div");
  userHeading.classList.add(
    "flex",
    "flex-wrap",
    "justify-center",
    "items-center",
    "gap-2",
    "relative"
  );

  let visibleUsername = user.username;
  let maxLength = 20;
  if (visibleUsername) {
    if (visibleUsername.length > maxLength) {
      visibleUsername = visibleUsername.substring(0, maxLength) + "..";
    }
  }

  const username = createTitle(visibleUsername);
  username.className = "text-[1.8rem] sm:text-bigger m-4";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = `relative inline-flex items-center justify-center
  w-32 h-32 overflow-hidden bg-gray-100 rounded-full ring-2 ring-accent-light
  dark:bg-gray-600 dark:ring-accent-dark`;

  const avatarPlaceholder = document.createElement("span");
  avatarPlaceholder.className =
    "font-medium text-lg text-gray-600 dark:text-gray-300";
  avatarPlaceholder.textContent = "JL";

  const avatar = document.createElement("img");
  avatar.className = "w-32 h-32 object-cover";
  avatar.src = user.avatarSrc;
  avatar.alt = user.avatarAlt;

  if (avatar.src != null || "") {
    avatarWrapper.appendChild(avatar);
  } else {
    avatarWrapper.appendChild(avatarPlaceholder);
  }

  userHeading.appendChild(avatarWrapper);
  userHeading.appendChild(username);

  const fullUsername = document.createElement("div");
  fullUsername.className = `absolute top-[90%] sm:top-[65%] left-1/2 -translate-x-1/2 sm:translate-x-0
  bg-gray-100 text-gray-800 p-2 rounded-md shadow-md text-sm
  opacity-0 transition-opacity duration-200 z-10 pointer-events-none`;
  fullUsername.textContent = user.username;
  userHeading.appendChild(fullUsername);

  username.addEventListener("mouseover", () => {
    fullUsername.classList.remove("opacity-0");
  });

  username.addEventListener("mouseout", () => {
    fullUsername.classList.add("opacity-0");
  });

  return userHeading;
}
