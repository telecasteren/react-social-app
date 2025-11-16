import { UserSettings } from "@/components/settings/createUserSettings";
import { endDot } from "@/utils/branding/config";

const SettingsComponent = () => {
  return (
    <UserSettings>
      Settings
      <span
        dangerouslySetInnerHTML={{ __html: endDot }}
        className="inline-block"
        style={{
          lineHeight: "1",
          verticalAlign: "baseline",
          transform: "translateY(-3px)",
        }}
      />
    </UserSettings>
  );
};

export default SettingsComponent;
