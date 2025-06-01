export default async function Details(user) {
  const numberOfPosts = user._count.posts;
  const numberOfFollowers = user._count.followers;
  const numberOfFollowing = user._count.following;

  const userDetails = document.createElement("div");
  userDetails.className = "flex flex-wrap justify-center mr-0 gap-2 md:ml-24";

  const username = document.createElement("p");
  username.textContent = user.name || "Unknown user";
  username.className = "text-sm m-4";

  const statsWrapper = document.createElement("div");
  statsWrapper.className = "flex flex-wrap gap-2";

  function createWrapper(number, label) {
    const container = document.createElement("div");
    container.className = "flex flex-col items-center";

    const wrapper = document.createElement("div");
    wrapper.className = `relative inline-flex items-center justify-center
      w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-2 ring-accent-light
      dark:bg-gray-600 dark:ring-accent-dark`;

    const text = document.createElement("div");
    text.className = "font-medium text-tiny text-gray-600 dark:text-gray-300";
    text.innerText = number;
    text.setAttribute("data-label", label);

    const labelText = document.createElement("div");
    labelText.className = "text-xs text-gray-900 dark:text-gray-400 mt-1";
    labelText.innerText = label;

    wrapper.appendChild(text);
    container.appendChild(wrapper);
    container.appendChild(labelText);
    return container;
  }

  const postsCircle = createWrapper(numberOfPosts, "posts");
  const followersCircle = createWrapper(numberOfFollowers, "followers");
  const followingCircle = createWrapper(numberOfFollowing, "following");

  statsWrapper.appendChild(postsCircle);
  statsWrapper.appendChild(followersCircle);
  statsWrapper.appendChild(followingCircle);

  userDetails.appendChild(username);
  userDetails.appendChild(statsWrapper);

  return userDetails;
}
