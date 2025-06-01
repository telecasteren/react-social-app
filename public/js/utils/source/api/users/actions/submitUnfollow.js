import { userMessage } from "/js/utils/messages/userMessage.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import { getSingleUserProfile } from "/js/utils/source/api/users/getSingleUser.js";
import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";

export async function submitUnfollow() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  const user = await getSingleUserProfile(userId);
  const username = user.name;

  console.log("user:", user);
  console.log("username:", username);

  try {
    const response = await authFetch(
      `${API_BASE_URL}${API_USERS}/${username}/unfollow`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    userMessage(
      "warning",
      "An error occurred when you tried to unfollow this user. Please try again."
    );
    console.error("Error submitting unfollow:", error);
    throw error;
  }
}
