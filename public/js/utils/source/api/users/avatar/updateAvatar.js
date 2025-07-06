import {
  API_BASE_URL,
  API_USERS,
} from "/js/utils/source/api/general/constants.js";
import { authFetch } from "/js/utils/source/api/auth/authFetch.js";
import { getUserParams } from "/js/utils/source/helpers/getUserParams.js";

export async function updateUserAvatar(user) {
  const profile = await getUserParams();
  const userId = profile.name;

  const form = document.querySelector("#avatar-form");
  if (!form) return;

  const newAvatar = form.querySelector("#avatar").value.trim();
  const avatar = {
    url: newAvatar || user.avatar?.url,
    alt: `Profile image for user: ${userId}`,
  };

  try {
    const response = await authFetch(`${API_BASE_URL}${API_USERS}/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ avatar }),
    });
    console.log("Response from updateUserAvatar:", response);

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error("Updating profile image failed.");
  }
}
