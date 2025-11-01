import { Link } from "@tanstack/react-router";
import NavLink from "./NavLink";
import { showLink } from "@/components/navbar/helpers/showLink";
import { SITE_LOGO_NAME, SITE_NAME } from "@/utils/branding/config";
import type { NavContentProps } from "@/utils/types/navbar/types";

const DesktopNavContent: React.FC<NavContentProps> = ({
  auth,
  links,
  className,
  navRef,
}) => {
  return (
    <div
      className={`fixed md:flex items-center justify-between flex-wrap p-[2.5rem] z-40 w-full transition-background-color duration-300 ${className}`}
    >
      <ul
        ref={navRef}
        className="active flex items-center space-x-8 dark:text-dark"
      >
        {links
          .filter((link) => showLink(link, auth))
          .map((link) => (
            <li
              key={link.text}
              id={`nav-${link.text.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <NavLink link={link} />
            </li>
          ))}
      </ul>

      <Link to="/user/feed/explore" className="nav-logo">
        <img
          className="w-32 flex justify-end dark:invert"
          src={SITE_LOGO_NAME}
          alt={`Logo: ${SITE_NAME} | A slice of life`}
        />
      </Link>
    </div>
  );
};
export default DesktopNavContent;
