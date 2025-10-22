import { saveKey } from "@/services/helpers/storage";
import { authFetch } from "./authFetch.js";
import {
  API_BASE_URL,
  API_AUTH,
  API_LOGIN,
} from "@/services/api/auth/config/constants";

export const login = async (email: string, password: string) => {
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
};
