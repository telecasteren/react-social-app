import { userMessage } from "/js/utils/messages/userMessage.js";
import { createSingleCard } from "/js/app/routes/feed/cards/createSingleCard.js";
import { openPost } from "/js/app/events/profile/goToPost.js";
import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { submitPost } from "/js/utils/source/api/posts/submitPost.js";

/**
 * Retrieves the input values from the "create new post" form,
 * converts the image to a base64 string, creates a new post object,
 * updates the local storage, and uses the {@link createSingleCard}
 * function to render and prepend the new post to the DOM.
 * @function submitHandler
 * @function openPost - Adds the eventListeners for navigating to the new post.
 * @returns {void}
 */
export async function submitHandler() {
  const imgUrlInput = document.getElementById("image_url");
  const title = document.getElementById("title");
  const body = document.getElementById("caption");
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    userMessage("error", "You must be logged in to post.");
    return;
  }

  if (!imgUrlInput.value.trim() || !body.value.trim()) {
    userMessage("warning", "Please upload an image and write a caption!");
    return;
  }

  const newPostCard = {
    title: title ? title.value.trim() : "New Post",
    body: body.value.trim(),
    media: {
      url: imgUrlInput.value.trim(),
      alt: `Post image titled: ${title ? title.value.trim() : "New Post"}`,
    },
  };

  try {
    const createdPost = await submitPost(newPostCard);

    const newPostCardCard = createSingleCard(createdPost);
    cardContainer.prepend(newPostCardCard);

    openPost();
  } catch (error) {
    userMessage("error", "Failed to submit post to server.");
    throw error;
  }
}
