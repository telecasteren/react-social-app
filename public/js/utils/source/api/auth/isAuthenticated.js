import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";

export async function isAuthenticated() {
  try {
    const user = await getCurrentUser();
    const token = localStorage.getItem("token");

    if (!user || !token) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("isAuthenticated() error:", error);
    return false;
  }
}
