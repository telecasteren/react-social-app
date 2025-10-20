import { toast } from "react-hot-toast";
import { getSingleUserProfile } from "@/services/api/user/getSingleUserProfile";

export const getUserParams = async () => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  const username = urlParams.get("id");

  if (!username) {
    toast.error("Missing username in URL.");
    throw new Error(`No username in URL.`);
  }

  const user = await getSingleUserProfile(username);

  return user;
};
