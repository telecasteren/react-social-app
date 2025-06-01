// import {
//   API_BASE_URL,
//   API_KEY_URL,
//   API_AUTH,
// } from "/js/utils/source/api/general/constants.js";
// import { loadKey } from "/js/utils/source/storage/localStorage.js";

// export async function getAPIKey() {
//   const response = await fetch(API_BASE_URL + API_AUTH + API_KEY_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${loadKey("token")}`,
//     },
//     body: JSON.stringify({
//       name: "test key",
//     }),
//   });

//   if (response.ok) {
//     return await response.json();
//   }
//   throw new Error("Could not register for an API key.");
// }
