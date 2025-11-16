import { toast } from "react-hot-toast";

export const getPostParams = () => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  const id = urlParams.get("id");

  if (!id) {
    toast.error("Missing id in URL.");
    throw new Error(`No ID in URL.`);
  }

  return { id };
};
