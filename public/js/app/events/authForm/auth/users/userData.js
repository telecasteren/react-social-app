import { users } from "/js/utils/source/users/users.js";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export function getAllUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : users;
}

export function getUserLookup() {
  return Object.fromEntries(getAllUsers().map((u) => [u.id, u]));
}

export function getUserEmails(email) {
  return getAllUsers().find((user) => user.email === email);
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function saveCurrentUser(currentUser) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}
