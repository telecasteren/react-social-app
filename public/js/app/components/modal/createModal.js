/**
 * Creates and returns a hidden modal element with a close button.
 *
 * The modal consists of a container `div` with class `modal`, a nested
 * `div` with class `modal-content`, and a `span` element that serves
 * as the close button.
 *
 * @returns {HTMLDivElement} The constructed modal element.
 */
export function createModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.style.display = "none";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeButton = document.createElement("span");
  closeButton.innerHTML = "&times;";
  closeButton.className = `close-modal relative m-0 ml-2 text-[var(--accent)] max-w-[50px]
  flex justify-center text-[38px] font-bold cursor-pointer hover:text-black`;

  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  return modal;
}

/**
 * Displays a modal with dynamic content. If the modal doesn't exist
 * in the DOM, it will be created and appended to the body.
 *
 * The content passed in will be inserted into the modal, and the modal
 * will be made visible.
 *
 * @param {HTMLElement} content - The content to display inside the modal.
 */
export function toggleModal(content) {
  let modal = document.querySelector(".modal");

  if (!modal) {
    modal = createModal();
    document.body.appendChild(modal);
  }

  const modalContent = modal.querySelector(".modal-content");
  const closeButton = modal.querySelector(".close-modal");

  modalContent.innerHTML = "";
  modalContent.appendChild(closeButton);
  modalContent.appendChild(content);

  modal.style.display = "block";
}

/**
 * Hides the modal if it exists, and removes any lingering event listeners
 * that were set up for closing the modal.
 *
 * Intended to close the modal by setting its `display` style to `none`
 * and detaching event listeners for the close button and outside clicks.
 */
export function closeModal() {
  const modal = document.querySelector(".modal");
  const closeButton = document.querySelector(".close-modal");

  modal.style.display = "none";

  const onCloseClick = (event) => {
    if (event.target === closeButton) {
      closeModal();
    }
  };

  const onClickOutside = (event) => {
    if (event.target === modal) {
      closeModal();
    }
  };

  closeButton.removeEventListener("click", onCloseClick);
  window.removeEventListener("click", onClickOutside);
}
