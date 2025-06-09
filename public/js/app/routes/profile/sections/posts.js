import { getUserPosts } from "/js/utils/source/api/posts/get/getUserPosts.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";
import { createTitle } from "/js/app/components/titles/title.js";
import { editPostMenuEvents } from "/js/app/events/profile/editPost/menuHandlers.js";

export default async function Posts() {
  const { data: userPosts } = await getUserPosts();
  const loggedInUser = await getCurrentUser();
  const profileVisited = await getUserParams();

  // DEBUGGING
  console.log("Logged in user:", loggedInUser);
  console.log("Profile visited:", profileVisited);
  //----------

  const postsList = document.createElement("div");
  postsList.id = "posts-container";
  postsList.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5";

  if (userPosts.length === 0) {
    const message = document.createElement("div");
    message.textContent = "No posts yet.";
    message.className =
      "p-4 text-center text-medium rounded-sm shadow-xl border border-accent-light dark:border-accent-dark";

    postsList.appendChild(message);
    return postsList;
  }

  userPosts.forEach(async (post) => {
    const postContainer = document.createElement("div");
    postContainer.className =
      "user-post relative w-full h-48 flex justify-center items-center cursor-pointer";
    postContainer.setAttribute("data-id", post.id);
    postContainer.dataset.created = post.created;
    postContainer.dataset.title = post.title;
    postContainer.dataset.likes =
      typeof post._count.reactions === "number" ? post._count.reactions : 0;
    postContainer.dataset.comments =
      typeof post._count.comments === "number" ? post._count.comments : 0;

    const helpText = createTitle("Edit");
    helpText.className = `ml-2 whitespace-nowrap opacity-0 transition-opacity duration-300 text-[0.8rem] text-white`;

    const editPostIcon = document.createElement("div");
    editPostIcon.setAttribute("data-id", post.id);
    editPostIcon.className = `
  edit-post absolute top-2 right-2 pl-2 pr-2 w-10 hover:w-24 h-10
  bg-gray-800 dark:bg-[#181438e3] hover:bg-gray-600 hover:dark:bg-[#534ba5e3]
  rounded shadow-md cursor-pointer z-10 flex items-center justify-start
  overflow-hidden transition-all duration-300 group
`;

    const svgIcon = document.createElement("div");
    svgIcon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
  <path d="M16.862 3.487a2.125 2.125 0 0 1 3.001 3.001l-1.127 1.127-3.001-3.001 1.127-1.127zM14.993 5.356l3.001 3.001L7.5 18.85H4.5v-3L14.993 5.356z"/>
</svg>
`;

    const statsWrapper = document.createElement("div");
    statsWrapper.className =
      "absolute justify-center flex flex-wrap gap-2 bg-white text-black rounded-md p-1";

    const likes = document.createElement("div");
    const numOfLikes = post._count.reactions;
    likes.innerText = `♥️ ${numOfLikes} Likes`;
    statsWrapper.appendChild(likes);

    const comments = document.createElement("div");
    const numOfComments = post._count.comments ? post._count.comments : 0;
    comments.innerText = `💬 ${numOfComments} Comments`;
    statsWrapper.appendChild(comments);

    const postImage = document.createElement("img");
    postImage.src = post.media?.url || "/resources/icons/no-image-icon.webp";
    postImage.alt = post.media?.alt || "Default post image";
    postImage.className = `w-full h-full object-cover rounded-sm border border-gray-300 dark:border-0
      hover:scale-105 md:hover:bg-black md:hover:opacity-50 transition-transform duration-300`;

    postContainer.appendChild(postImage);

    if (loggedInUser.name === profileVisited.name) {
      helpText.classList.add("group-hover:opacity-100");

      editPostIcon.appendChild(svgIcon);
      editPostIcon.appendChild(helpText);
      postContainer.appendChild(editPostIcon);

      editPostIcon.addEventListener("click", async () => {
        const postData = {
          id: post.id,
          media: {
            url: post.media?.url || "",
          },
          title: post.title || "",
          body: post.body || "",
        };

        await editPostMenuEvents(postData);
      });
    }

    postContainer.appendChild(statsWrapper);
    postsList.appendChild(postContainer);
  });

  return postsList;
}
