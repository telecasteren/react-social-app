import { authFetch } from "./authFetch.js";
import {
  API_BASE_URL,
  API_AUTH,
  API_REGISTER,
} from "@/services/api/auth/config/constants";

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await authFetch(API_BASE_URL + API_AUTH + API_REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Registering account failed.");
};
