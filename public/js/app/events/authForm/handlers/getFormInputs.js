export function getAuthInputs() {
  const form = document.getElementById("auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPassInput = document.getElementById("confirm-password");

  return { form, emailInput, passwordInput, confirmPassInput };
}
