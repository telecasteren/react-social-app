import { Link } from "@tanstack/react-router";
import type { NavLink as NavLinkType } from "@/utils/types/navbar/types";
import SettingsComponent from "@/components/settings/UserSettings";

interface NavLinkProps {
  link: NavLinkType;
}

const NavLink: React.FC<NavLinkProps> = ({ link }) => {
  if (link.isDropdown) {
    return <SettingsComponent />;
  }

  return (
    <Link
      to={link.href}
      className="text-black dark:text-white hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-200 [&.active]:text-accent-light dark:[&.active]:text-accent-dark"
    >
      {link.text}
    </Link>
  );
};
export default NavLink;
