import Heading from "/js/app/routes/profile/sections/heading.js";
import Details from "/js/app/routes/profile/sections/details.js";
import Description from "/js/app/routes/profile/sections/description.js";
import { createSortOptions } from "/js/app/components/search/sortOptions.js";
import Posts from "/js/app/routes/profile/sections/posts.js";
import { userMessage } from "/js/utils/messages/userMessage.js";
import createButton from "/js/app/components/buttons/primaryBtn.js";
import { getAllUsers } from "/js/app/events/authForm/auth/users/userData.js";

export default function Profile() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = parseInt(urlParams.get("id"));
  const user = getAllUsers().find((u) => u.id === userId);

  if (!user) {
    const footer = document.querySelector(".footer");
    const exampleProfileBtn = createButton({
      text: "Click to see example profile",
      href: "/user/profile/?id=1",
      newTab: false,
    });
    exampleProfileBtn.classList.add(
      "btn-primary",
      "w-64",
      "justify-self-center",
      "mt-32",
      "text-center"
    );
    document.body.insertBefore(exampleProfileBtn, footer);

    userMessage(
      "error",
      "Woops! Couldn't find this user. Should they have been here? Try again later."
    );
    return;
  }

  const profileContainer = document.createElement("div");
  profileContainer.className =
    "profile-container w-[100vw] min-h-screen p-8 gap-16";

  const userHeading = Heading();
  const userDetails = Details();
  const userDescription = Description();
  const sortOptions = createSortOptions({
    triggerType: "p",
    triggerText: "Sort posts →",
  });
  const postsList = Posts();

  const postsContainer = document.createElement("div");
  postsContainer.className = "w-[90%] mx-auto";
  postsContainer.appendChild(sortOptions);
  postsContainer.appendChild(postsList);

  profileContainer.appendChild(userHeading);
  profileContainer.appendChild(userDetails);
  profileContainer.appendChild(userDescription);
  profileContainer.appendChild(postsContainer);

  return profileContainer;
}
