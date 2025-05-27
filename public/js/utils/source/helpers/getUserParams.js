import { userMessage } from "../../messages/userMessage.js";
import { getSingleUserProfile } from "../api/users/getSingleUser.js";

export async function getUserParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("id");

  if (!username) {
    userMessage("warning", "Missing username in URL.");
    throw new Error(`No username in URL.`);
  }

  const user = await getSingleUserProfile(username);

  return user;
}
