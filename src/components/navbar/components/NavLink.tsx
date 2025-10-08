import { Link } from "@tanstack/react-router";
import type { NavLink as NavLinkType } from "@/components/navbar/types/types";

interface NavLinkProps {
  link: NavLinkType;
}

const NavLink: React.FC<NavLinkProps> = ({ link }) => {
  if (link.isDropdown) {
    // Placeholder for dropdown logic
    return <span className="cursor-pointer">{link.text}</span>;
  }

  return (
    <Link
      to={link.href}
      className="hover:text-accent transition-colors duration-200 [&.active]:text-accent"
    >
      {link.text}
    </Link>
  );
};
export default NavLink;
