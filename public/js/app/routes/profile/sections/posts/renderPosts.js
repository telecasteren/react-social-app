import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";
import { createEditIcon } from "/js/app/components/buttons/editIconBtn.js";
import { editPostMenuEvents } from "/js/app/events/profile/editPost/menuHandlers.js";

export const renderPosts = async (posts, container) => {
  if (!container) {
    console.error("container is undefined");
    return;
  }

  const loggedInUser = await getCurrentUser();
  const profileVisited = await getUserParams();

  posts.forEach(async (post) => {
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

    const postImage = document.createElement("img");
    postImage.src = post.media?.url || "/resources/icons/no-image-icon.webp";
    postImage.alt = post.media?.alt || "Default post image";
    postImage.className = `w-full h-full object-cover rounded-sm border border-gray-300 dark:border-0
      hover:scale-105 md:hover:bg-black md:hover:opacity-50 transition-transform duration-300`;

    const statsWrapper = document.createElement("div");
    statsWrapper.className =
      "absolute justify-center flex flex-wrap gap-2 bg-white text-black rounded-md p-1";

    const likes = document.createElement("div");
    likes.innerText = `♥️ ${post._count.reactions || 0} Likes`;

    const comments = document.createElement("div");
    comments.innerText = `💬 ${post._count.comments || 0} Comments`;

    statsWrapper.appendChild(likes);
    statsWrapper.appendChild(comments);
    postContainer.appendChild(postImage);

    if (loggedInUser.name === profileVisited.name) {
      const editPostIcon = createEditIcon({
        label: "Edit",
        classes: `
    edit-post absolute top-2 right-2 pl-2 pr-2 w-10 hover:w-24 h-10
    bg-gray-800 dark:bg-[#181438e3] hover:bg-gray-600 hover:dark:bg-[#534ba5e3]
    rounded shadow-md cursor-pointer flex items-center justify-start
    overflow-hidden transition-all duration-300 group
    `,
      });
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
    container.appendChild(postContainer);
  });
};
