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
      className="text-black dark:text-white hover:text-[var(--accent)] transition-colors duration-200 [&.active]:text-[var(--accent)]"
    >
      {link.text}
    </Link>
  );
};
export default NavLink;
