import newPost from "/js/app/components/forms/newPostForm.js";
import {
  createModal,
  toggleModal,
} from "/js/app/components/modal/createModal.js";
import { submitPost } from "/js/app/events/newPost/submitEvents/submitNewPost.js";

/**
 * Creates a modal, renders the new post form inside it, and attaches the submit event handler.
 * This function handles the display and setup for the new-post form modal.
 * @function CreateModalAndAddSubmitListeners
 * @returns {void}
 */
function CreateModalAndAddSubmitListeners() {
  createModal();

  const newPostForm = newPost();
  toggleModal(newPostForm);
  submitPost();
}

/**
 * Sets up event listeners for the "create-post" button for displaying the modal.
 * Also handles the visibility of the speed dial menu on hover.
 * @function createPostMenuEvents
 * @returns {void}
 */
export function createPostMenuEvents() {
  const newPostBtn = document.getElementById("create-post");
  const menu = document.getElementById("speed-dial-menu-dropdown");

  if (newPostBtn) {
    newPostBtn.addEventListener("mouseover", () => {
      if (menu) menu.classList.remove("hidden");
    });
    newPostBtn.addEventListener("mouseout", () => {
      if (menu) menu.classList.add("hidden");
    });
  }

  if (newPostBtn) {
    newPostBtn.addEventListener("click", () =>
      CreateModalAndAddSubmitListeners()
    );
  }
}
