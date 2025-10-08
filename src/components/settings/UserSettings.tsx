import { createUserSettings } from "";

export const userSettings = () => {
  return createUserSettings({
    triggerType: "button",
    triggerText: "Settings",
  });
};
