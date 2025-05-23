import Heading from "/js/app/routes/profile/sections/heading.js";
import Details from "/js/app/routes/profile/sections/details.js";
import Description from "/js/app/routes/profile/sections/description.js";
import { createSortOptions } from "/js/app/components/search/sortOptions.js";
import Posts from "/js/app/routes/profile/sections/posts.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";

export default async function Profile() {
  const user = await getUserParams();
  if (!user) return;

  const profileContainer = document.createElement("div");
  profileContainer.className =
    "profile-container w-[100vw] min-h-screen p-8 gap-16";

  const userHeading = await Heading(user);
  const userDetails = await Details(user);
  const userDescription = await Description(user);
  const sortOptions = createSortOptions({
    triggerType: "p",
    triggerText: "Sort posts →",
  });
  const postsList = await Posts(user);

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
