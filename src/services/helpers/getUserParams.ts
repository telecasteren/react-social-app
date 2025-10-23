import { toast } from "react-hot-toast";
import { getSingleUserProfile } from "@/services/api/user/getSingleUserProfile";

export const getUserParams = async (username?: string) => {
  if (username) {
    const user = await getSingleUserProfile(username);
    return user;
  }

  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  const usernameFromQuery = urlParams.get("id");

  if (!usernameFromQuery) {
    toast.error("Missing username in URL.");
    throw new Error(`No username in URL.`);
  }

  const user = await getSingleUserProfile(usernameFromQuery);
  return user;
};
