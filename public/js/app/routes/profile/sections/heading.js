import { createTitle } from "/js/app/components/titles/title.js";
import { editAvatar } from "/js/app/components/forms/avatarForm.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import {
  showTooltip,
  hideTooltip,
} from "/js/app/components/tooltip/tooltip.js";

const Heading = async (user) => {
  const currentUser = loadKey("profile");
  const currentUsername = currentUser?.name || "Unknown user";
  const userNameParam = user?.name || "Unknown user";
  const userAvatarSrc = user.avatar?.url;
  const userAvatarAlt = user.avatar?.alt;

  const userHeading = document.createElement("div");
  userHeading.classList.add(
    "flex",
    "flex-wrap",
    "justify-center",
    "items-center",
    "gap-2",
    "relative"
  );

  let visibleUsername = user.name || "Unknown user";
  let maxLength = 20;
  if (visibleUsername) {
    if (visibleUsername.length > maxLength) {
      visibleUsername = visibleUsername.substring(0, maxLength) + "...";
    }
  }

  const username = createTitle(visibleUsername);
  username.className = "text-[1.8rem] sm:text-bigger m-4";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = `relative group inline-flex items-center justify-center
  w-32 h-32 overflow-hidden bg-gray-100 rounded-full ring-2 ring-accent-light
  dark:bg-gray-600 dark:ring-accent-dark`;

  const avatarPlaceholder = document.createElement("span");
  avatarPlaceholder.className =
    "font-medium text-lg text-gray-600 dark:text-gray-300";
  avatarPlaceholder.textContent = "JL";

  const avatar = document.createElement("img");
  avatar.id = "avatar-img";
  avatar.className =
    "w-32 h-32 object-cover transition duration-300 ease-in-out group-hover:blur-sm";
  avatar.src = userAvatarSrc;
  avatar.alt = userAvatarAlt || "No image uploaded.";

  if (avatar.src != null || "") {
    avatarWrapper.appendChild(avatar);
  } else {
    avatarWrapper.appendChild(avatarPlaceholder);
  }

  const avatarContainer = document.createElement("div");
  avatarContainer.className = "relative w-full h-full";

  const editAvatarIcon = document.createElement("div");
  editAvatarIcon.className = `absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm
  flex items-center justify-center opacity-0 group-hover:opacity-100
  transition-opacity duration-300 cursor-pointer rounded-full`;

  const svgIcon = document.createElement("div");
  svgIcon.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.862 3.487a2.125 2.125 0 0 1 3.001 3.001l-1.127 1.127-3.001-3.001 1.127-1.127zM14.993 5.356l3.001 3.001L7.5 18.85H4.5v-3L14.993 5.356z"/>
  </svg>
`;
  editAvatarIcon.appendChild(svgIcon);

  avatar.classList.add("group-hover:blur-sm");

  editAvatarIcon.addEventListener("click", async () => {
    const avatarEditForm = await editAvatar(user, avatarWrapper);
    avatarWrapper.replaceWith(avatarEditForm);
  });

  if (currentUsername === userNameParam) {
    avatarContainer.appendChild(avatar);
    avatarContainer.appendChild(editAvatarIcon);
    avatarWrapper.appendChild(avatarContainer);
  }
  userHeading.appendChild(avatarWrapper);
  userHeading.appendChild(username);

  username.addEventListener("mouseover", () => {
    showTooltip(username, null, user.name);
  });
  username.addEventListener("mouseout", hideTooltip);

  return userHeading;
};
export default Heading;
