import { userMessage } from "/js/utils/messages/userMessage.js";
import { createSingleCard } from "/js/app/routes/feed/cards/createSingleCard.js";
import { posts } from "/js/utils/source/posts/posts.js";
import { openPost } from "/js/app/events/profile/goToPost.js";
import { getCurrentUser } from "/js/utils/userData.js";

/**
 * Retrieves the input values from the "create new post" form,
 * converts the image to a base64 string, creates a new post object,
 * updates the local storage, and uses the {@link createSingleCard}
 * function to render and prepend the new post to the DOM.
 * @function submitHandler
 * @function openPost - Adds the eventListeners for navigating to the new post.
 * @returns {void}
 */
export function submitHandler() {
  const postImage = document.querySelector("img[alt='New post-image']");
  const title = document.getElementById("title");
  const caption = document.getElementById("caption");
  const currentUser = getCurrentUser();

  if (!currentUser) {
    userMessage("error", "You must be logged in to post.");
  }

  if (!postImage.src || !caption.value.trim()) {
    userMessage("warning", "Please upload an image and write a caption!");
    return;
  }

  fetch(postImage.src)
    .then((res) => res.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Image = reader.result;

        const newPostCard = {
          id: posts.length + 1,
          title: title ? title.value.trim() : "New Post",
          imgSrc: base64Image,
          imgAlt: `Post image titled: ${
            title ? title.value.trim() : "New Post"
          }`,
          caption: caption.value.trim(),
          likes: 0,
          username: currentUser?.username || "Unknown user",
          userId: currentUser?.id,
          createdAt: new Date(),
          comments: [],
        };
        posts.unshift(newPostCard);
        localStorage.setItem("posts", JSON.stringify(posts));

        const cardContainer = document.getElementById("card-container");
        if (!cardContainer) {
          userMessage("error", "Couldn't create post.");
          return;
        }
        const newPostCardCard = createSingleCard(newPostCard);
        cardContainer.prepend(newPostCardCard);

        openPost();
      };
    })
    .catch((error) => console.error("Error when converting image:", error));
}
