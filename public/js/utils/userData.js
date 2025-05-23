// import { users } from "/js/utils/source/users/users.js";
// import { getAllUsers } from "/js/utils/source/api/users/getAllUsers.js";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "profile";

// export function getAllUsers() {
//   const stored = localStorage.getItem(USERS_KEY);
//   return stored ? JSON.parse(stored) : users;
// }

// export async function getUserLookup() {
//   const users = await getAllUsers();
//   return Object.fromEntries(users().map((u) => [u.id, u]));
// }

// export function saveUsers(users) {
//   localStorage.setItem(USERS_KEY, JSON.stringify(users));
// }

// export function saveCurrentUser(currentUser) {
//   localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
// }

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}
