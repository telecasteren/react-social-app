import createButton from "/js/app/components/buttons/primaryBtn.js";
import { userMessage } from "/js/utils/messages/userMessage.js";
import { getAllUsers } from "/js/app/events/authForm/auth/users/userData.js";

export default function Description() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = parseInt(urlParams.get("id"));
  const user = getAllUsers().find((u) => u.id === userId);

  const userDescription = document.createElement("div");
  userDescription.className = "grid grid-cols-1 mt-16";

  const description = document.createElement("p");
  description.innerText = user.description;
  description.className = "text-sm m-2 justify-self-center";

  const followBtn = createButton({
    text: "Follow.",
    href: "#",
    newTab: false,
  });
  followBtn.classList.add("btn-secondary", "justify-self-center");

  let isFollowing = false;
  followBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!isFollowing) {
      userMessage("success", `You started following: ${user.username}`);
    } else {
      userMessage("info", `You stopped following: ${user.username}`);
    }

    isFollowing = !isFollowing;
  });

  userDescription.appendChild(description);
  userDescription.appendChild(followBtn);

  return userDescription;
}
