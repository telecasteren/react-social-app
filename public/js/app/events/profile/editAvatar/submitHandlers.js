import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";
import { updateUserAvatar } from "/js/utils/source/api/users/avatar/updateAvatar.js";

export const editAvatarFormEventHandlers = (form, user) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await updateUserAvatar(user);
      userMessage("success", "Profile image updated!");

      setTimeout(() => {
        clearUserMessage();
        window.location.href = window.location.href;
      }, 500);
    } catch (error) {
      console.error(error);
      userMessage("warning", "Couldn't update profile image.");

      setTimeout(clearUserMessage, 1000);
    }
  });
};
