import { getAuthInputs } from "./getFormInputs.js";
import { displayFormErrorMessage } from "/js/utils/messages/formMessage.js";
import { register } from "/js/utils/source/api/auth/registerUser.js";
import { login } from "/js/utils/source/api/auth/loginUser.js";

export const handleAuth = async (isSignup = false) => {
  const { usernameInput, emailInput, passwordInput, confirmPassInput } =
    getAuthInputs();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (isSignup) {
    const confirmPassword = confirmPassInput?.value.trim();
    const username = usernameInput.value.replace(/\s+/g, "_").toLowerCase();

    if (!confirmPassword || password !== confirmPassword) {
      displayFormErrorMessage(confirmPassInput, "Passwords must match.");
      return;
    }

    try {
      const newUser = await register(username, email, password);
      const { name } = (await login(email, password)) || email.split("@")[0];

      window.location.href = `/user/profile/?id=${newUser.username || name}`;
    } catch (error) {
      displayFormErrorMessage(
        emailInput,
        "Registration failed. Email may be in use."
      );
      throw new Error();
    }
  } else {
    try {
      const { name } = await login(email, password);
      window.location.href = `/user/profile/?id=${name}`;
    } catch (error) {
      displayFormErrorMessage(
        emailInput,
        "Login failed. Invalid email or password."
      );
      throw new Error(error.message || "Login failed. Invalid credentials.");
    }
  }
};
