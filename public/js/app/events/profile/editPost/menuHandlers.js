import editPostForm from "/js/app/components/forms/editPostForm.js";
import {
  createModal,
  toggleModal,
} from "/js/app/components/modal/createModal.js";
// import { submitPost } from "/js/app/events/newPost/submitEvents/submitNewPost.js";

async function CreateModalAndAddSubmitListeners() {
  createModal();

  const editPost = await editPostForm();
  toggleModal(editPost);
  // submitPost();
}

export function editPostMenuEvents() {
  const editIcons = document.querySelectorAll(".edit-post");

  editIcons.forEach((icon) => {
    icon.addEventListener("click", async (e) => {
      e.stopPropagation();
      e.preventDefault();
      await CreateModalAndAddSubmitListeners();
    });
  });
}
