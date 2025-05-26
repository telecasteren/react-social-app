import { userMessage } from "/js/utils/messages/userMessage.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import {
  API_BASE_URL,
  API_POSTS,
} from "/js/utils/source/api/general/constants.js";

/**
 * Submits a new post to the Noroff API.
 * @param {Object} postData - The post data to send.
 * @returns {Promise<Object>} - The created post from the API.
 */
export async function submitPost(postData) {
  try {
    const response = await authFetch(API_BASE_URL + API_POSTS, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    console.log("Response from submitPost:", response);

    if (!response.ok) {
      userMessage("Failed to submit post. Please try again.");
      throw new Error("Failed to submit post");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
