import toast from "react-hot-toast";
import { logoutFromStorage } from "@/services/helpers/storage";

export const getSettingsDropdownItems = (isLightTheme: boolean) => {
  const items = [
    {
      text: "Edit profile",
      action: () => {
        toast("This feature is coming soon.", { icon: "ℹ️" });
      },
    },
    {
      text: `${isLightTheme ? "Change theme 🔅" : "Change theme 🌙"}`,
      action: () => {
        toast("This feature is coming soon.", { icon: "ℹ️" });
      },
    },
    {
      text: "Logout",
      action: () => {
        toast.loading("Logging out...");

        setTimeout(() => {
          logoutFromStorage();
          toast.dismiss();
        }, 1000);
      },
    },
  ];
  return items;
};
