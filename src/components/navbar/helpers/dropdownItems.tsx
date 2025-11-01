import toast from "react-hot-toast";

export const settingsOptions = () => {
  const items = [
    {
      text: "Edit profile",
      action: () => {
        toast("This feature is coming soon.", { icon: "ℹ️" });
      },
    },
    {
      text: "Logout",
      action: () => {
        // Handle logout logic here
        console.log("Logout clicked");
      },
    },
  ];
  return items;
};
