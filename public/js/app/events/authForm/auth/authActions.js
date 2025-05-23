import { displayFormErrorMessage } from "/js/utils/messages/formMessage.js";
import { register } from "/js/utils/source/api/auth/registerUser.js";
import { login } from "/js/utils/source/api/auth/loginUser.js";

function getAuthInputs() {
  const form = document.getElementById("auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPassInput = document.getElementById("confirm-password");

  return { form, emailInput, passwordInput, confirmPassInput };
}

export async function handleAuth(isSignup = false) {
  const { emailInput, passwordInput, confirmPassInput } = getAuthInputs();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (isSignup) {
    const confirmPassword = confirmPassInput?.value.trim();

    if (!confirmPassword || password !== confirmPassword) {
      displayFormErrorMessage(confirmPassInput, "Passwords must match.");
      return;
    }

    try {
      const name = email.split("@")[0];
      const newUser = await register(name, email, password);
      await login(email, password);

      window.location.href = `/user/profile/?id=${newUser.name || name}`;
    } catch (error) {
      displayFormErrorMessage(emailInput, "Registration failed.");
      throw new Error();
    }
  } else {
    try {
      const { name } = await login(email, password);
      window.location.href = `/user/profile/?id=${name}`;
    } catch (error) {
      console.error("Login error:", error);
      displayFormErrorMessage(emailInput, "Login failed.");
      throw new Error(error.message || "Login failed.");
    }
  }
}

export function setAuthFormEvents(isSignup) {
  const { form } = getAuthInputs();
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      handleAuth(isSignup);
    });
  }
}
