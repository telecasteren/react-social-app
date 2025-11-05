import React, { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/hooks/theme/useTheme";
import type { NavContentProps } from "@/utils/types/navbar/types";
import { showLink } from "@/components/navbar/helpers/showLink";
import { getSettingsDropdownItems } from "@/components/settings/helpers/getSettingsDropdownItems";
import {
  endDot,
  MENU_ICON,
  SITE_NAME,
  SITE_LOGO_PIZZA,
} from "@/utils/branding/config";

const MobileNavContent: React.FC<NavContentProps> = ({
  auth,
  links,
  className,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLightTheme } = useTheme();
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav
      id="mobile-nav"
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-background-color duration-300 ${className || "bg-transparent"}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/user/feed/explore"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={SITE_LOGO_PIZZA}
            className="h-8 dark:invert"
            alt={`${SITE_NAME} logo`}
          />
          <span
            className="self-center text-2xl font-200 whitespace-nowrap dark:text-white"
            dangerouslySetInnerHTML={{ __html: SITE_NAME + endDot }}
          />
        </Link>

        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-accent-dark dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open menu</span>
          <img
            className="dark:invert dark:hover:invert-0"
            src={MENU_ICON}
            alt="Navigation menu"
          />
        </button>

        <div
          id="navbar-hamburger"
          className={`${isMenuOpen ? "block" : "hidden"} w-full bg-white dark:bg-bg-dark3`}
        >
          <ul className="flex flex-col font-medium mt-4 rounded-lg">
            {links
              .filter((link) => showLink(link, auth))
              .map((link) => (
                <li key={link.text} className="menuLi">
                  {link.isDropdown ? (
                    <>
                      {getSettingsDropdownItems(isLightTheme).map(
                        ({ text, action }) => (
                          <button
                            key={text}
                            className="mobile-nav-item block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer w-full text-left"
                            onClick={() => {
                              action();
                              closeMenu();
                            }}
                            dangerouslySetInnerHTML={{ __html: text + endDot }}
                          />
                        ),
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      className="mobile-nav-item block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      activeProps={{
                        className:
                          "mobile-nav-item block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer current-mobile-nav-item",
                      }}
                      onClick={closeMenu}
                    >
                      {link.text}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default MobileNavContent;
