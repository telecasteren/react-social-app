import { getAuthInputs } from "./getFormInputs.js";
import { handleAuth } from "./handleAuth.js";

export const setAuthFormEvents = (isSignup) => {
  const { form } = getAuthInputs();
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleAuth(isSignup);
    });
  }
};
