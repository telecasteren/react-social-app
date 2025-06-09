import editPostForm from "/js/app/components/forms/editPostForm.js";
import {
  createModal,
  toggleModal,
} from "/js/app/components/modal/createModal.js";

/**
 * Opens a modal with the edit post form for the current post
 * @param {Object} post - post data with id, media, title, and body
 */
export async function editPostMenuEvents(post) {
  createModal();

  const form = await editPostForm(post);
  toggleModal(form);
}
