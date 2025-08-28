import Heading from "/js/app/routes/profile/sections/heading.js";
import Details from "/js/app/routes/profile/sections/details.js";
import Description from "/js/app/routes/profile/sections/description.js";
import Posts from "/js/app/routes/profile/sections/posts/posts.js";
import createPostMenu from "/js/app/routes/feed/newPosts/createPostMenu.js";
import { createSortOptions } from "/js/app/components/search/sortOptions.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";
import { resetPagination } from "/js/utils/source/api/posts/get/loadMorePosts.js";
import { getUserPosts } from "/js/utils/source/api/posts/get/getUserPosts.js";
import { renderPosts } from "/js/app/routes/profile/sections/posts/renderPosts.js";
import { setScrollHandler } from "/js/utils/source/helpers/setScrollHandler.js";
import { createScrollHandler } from "/js/app/events/feed/createScrollHandler.js";

export default async function Profile() {
  const loggedInUser = await getCurrentUser();
  const user = await getUserParams();
  if (!user) return;

  resetPagination();

  const profileContainer = document.createElement("div");
  profileContainer.className =
    "profile-container w-[100vw] min-h-screen p-8 gap-16";

  resetPagination();

  const userHeading = await Heading(user);
  const userDetails = await Details(user);
  const userDescription = await Description(user);
  const newPost = createPostMenu();
  const sortOptions = createSortOptions({
    triggerType: "p",
    triggerText: "Sort posts →",
  });
  const postsList = await Posts(POSTS_PER_PAGE, 1);

  const postsContainer = document.createElement("div");
  postsContainer.className = "w-[90%] mx-auto";
  postsContainer.appendChild(sortOptions);
  postsContainer.appendChild(postsList);

  profileContainer.appendChild(userHeading);
  profileContainer.appendChild(userDetails);
  profileContainer.appendChild(userDescription);
  profileContainer.appendChild(postsContainer);

  const scrollHandler = createScrollHandler(
    getUserPosts,
    postsList,
    renderPosts
  );
  setScrollHandler(scrollHandler);

  if (loggedInUser?.name === user?.name) {
    profileContainer.appendChild(newPost);
  }

  return profileContainer;
}
