import { displayFormErrorMessage } from "/js/utils/messages/formMessage.js";
import { createNewUser } from "/js/app/events/profile/createNewUser.js";
import {
  getAllUsers,
  getUserEmails,
  saveUsers,
  saveCurrentUser,
} from "/js/app/events/authForm/auth/users/userData.js";

function getAuthInputs() {
  const form = document.getElementById("auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPassInput = document.getElementById("confirm-password");

  return { form, emailInput, passwordInput, confirmPassInput };
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

      const users = getAllUsers();
      const newId = Math.max(...users.map((user) => user.id)) + 1;
      const newUser = createNewUser({ id: newId, email, password });

      users.push(newUser);
      saveUsers(users);
      saveCurrentUser(newUser);

      window.location.href = `/user/profile/?id=${newId}`;
      console.log("Signed up as:", newUser.username);
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
