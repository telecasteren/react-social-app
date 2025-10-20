import toast from "react-hot-toast";

export const settingsOptions = () => {
  const items = [
    {
      text: "Edit profile",
      action: (event: unknown) => {
        /* will later handle editing username, name, avatar, email, etc. */
        event.addEventListener("click", () => {
          toast("This feature is coming soon.", { icon: "ℹ️" });
        });
      },
    },
    {
      text: "Logout",
    },
  ];
  return items;
};
