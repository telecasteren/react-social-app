import createButton from "/js/app/components/buttons/primaryBtn.js";
import { userMessage } from "/js/utils/messages/userMessage.js";

export default async function Description(user) {
  const userDescription = document.createElement("div");
  userDescription.className = "grid grid-cols-1 mt-16";

  const description = document.createElement("p");
  description.innerText = user.bio || "This user has no bio yet..";
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
      userMessage("success", `You started following: ${user.name}`);
    } else {
      userMessage("info", `You stopped following: ${user.name}`);
    }

    isFollowing = !isFollowing;
  });

  userDescription.appendChild(description);
  userDescription.appendChild(followBtn);

  return userDescription;
}
