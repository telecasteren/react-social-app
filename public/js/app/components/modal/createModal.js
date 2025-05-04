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

  const closeModal = () => {
    modal.style.display = "none";
    closeButton.removeEventListener("click", onCloseClick);
    window.removeEventListener("click", onClickOutside);
  };

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

  closeButton.addEventListener("click", onCloseClick);
  window.addEventListener("click", onClickOutside);
}
