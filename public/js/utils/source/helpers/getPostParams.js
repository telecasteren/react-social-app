import { userMessage } from "/js/utils/messages/userMessage.js";

export function getPostParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    userMessage("warning", "Missing id in URL.");
    throw new Error(`No ID in URL.`);
  }

  return postId;
}
