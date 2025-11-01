import { UserSettings } from "@/components/settings/createUserSettings";
import { endDot } from "@/utils/branding/config";

const SettingsComponent = () => {
  return (
    <UserSettings>
      Settings
      <span dangerouslySetInnerHTML={{ __html: endDot }} />
    </UserSettings>
  );
};

export default SettingsComponent;
