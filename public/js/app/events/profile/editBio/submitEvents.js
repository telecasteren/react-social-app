import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import {
  updateUserBio,
  clearUserBio,
} from "/js/utils/source/api/users/bio/updateBio.js";

/**
 * Attaches event listeners to handle editing and deleting user bio's.
 *
 * @param {HTMLFormElement} form - The form element for editing bio.
 * @param {Object} user - The user object (should contain at least the username).
 * @param {HTMLButtonElement} deleteButton - Button to trigger bio deletion.
 * @param {HTMLDivElement} confirmMessage - Confirmation message container.
 * @param {HTMLElement} confirmDeletion - Element the user clicks to confirm deletion.
 * @param {HTMLElement} denyDeletion - Element to cancel deletion.
 */
export const editBioFormEventHandlers = (
  form,
  user,
  deleteButton,
  confirmMessage,
  confirmDeletion,
  denyDeletion
) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const newBio = form.querySelector("#bio").value.trim();

      await updateUserBio(user.name, newBio);
      userMessage("success", "Bio updated!");

      setTimeout(() => {
        clearUserMessage();
        window.location.href = window.location.href;
      }, 1000);
    } catch (error) {
      console.error(error);
      userMessage("warning", "Couldn't update bio.");

      setTimeout(() => {
        clearUserMessage();
      }, 1000);
    }
  });

  deleteButton.addEventListener("click", () => {
    confirmMessage.classList.remove("hidden");

    if (!confirmMessage.contains(confirmDeletion)) {
      confirmMessage.appendChild(confirmDeletion);
    }
    if (!confirmMessage.contains(denyDeletion)) {
      confirmMessage.appendChild(denyDeletion);
    }
    if (!form.contains(confirmMessage)) {
      form.appendChild(confirmMessage);
    }

    confirmDeletion.addEventListener("click", async () => {
      try {
        await clearUserBio(user.name);
        userMessage("success", "Bio deleted.");

        setTimeout(() => {
          clearUserMessage();
          window.location.href = window.location.href;
        }, 2000);
      } catch (error) {
        console.error(error);
        userMessage("warning", "Couldn't delete bio.");
        setTimeout(() => {
          clearUserMessage();
        }, 3000);
      }
    });

    denyDeletion.addEventListener("click", (e) => {
      if (e.target === denyDeletion) confirmMessage.classList.add("hidden");
    });
  });
};
