import { saveKey } from "/js/utils/storage/saveKey.js";
import { authFetch } from "../general/authFetch.js";
import {
  API_BASE_URL,
  API_AUTH,
  API_LOGIN,
} from "/js/utils/source/api/constants.js";

export async function login(email, password) {
  const response = await authFetch(API_BASE_URL + API_AUTH + API_LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    saveKey("token", accessToken);
    saveKey("profile", profile);

    return profile;
  }

  throw new Error("Login failed.");
}
