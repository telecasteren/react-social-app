import { userLookup } from "/js/utils/source/users/users.js";
import { displayFormErrorMessage } from "/js/utils/messages/formMessage.js";
import { createNewUser } from "/js/app/events/profile/createNewUser.js";

function getAuthInputs() {
  const form = document.getElementById("auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPassInput = document.getElementById("confirm-password");

  return { form, emailInput, passwordInput, confirmPassInput };
}

function getUserEmails(email) {
  const users = Object.values(userLookup);
  return users.find((user) => user.email === email);
}

/**
 * Creates a new user, signs them in and routes to new user profile
 * OR
 * Logs in an existing user and routes to user profile.
 * @param {*} isSignup checks if the form events is for login or signup (create new user or use existing)
 */
export function handleAuth(isSignup = false) {
  const { form, emailInput, passwordInput, confirmPassInput } = getAuthInputs();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const user = getUserEmails(email);

    if (isSignup) {
      const confirmPassword = confirmPassInput?.value.trim();

      if (!confirmPassword || password !== confirmPassword) {
        displayFormErrorMessage(confirmPassInput, "Passwords must match.");
        return;
      }

      if (user) {
        displayFormErrorMessage(emailInput, "User already exists.");
        return;
      }

      const newId = Math.max(...Object.keys(userLookup).map(Number)) + 1;
      const newUser = createNewUser({ id: newId, email, password });

      userLookup[newId] = newUser;

      console.log("Signed up as:", newUser.username);
      window.location.href = `/user/profile/?id=${newId}`;
    } else {
      if (!user) {
        displayFormErrorMessage(emailInput, "User not found.");
        return;
      }

      if (user.password !== password) {
        displayFormErrorMessage(passwordInput, "Incorrect password.");
        return;
      }

      user.active = true;
      console.log("Logged in as user:", user.username);
      window.location.href = `/user/profile/?id=${user.id}`;
    }
  });
}
