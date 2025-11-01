import React, { useState, useEffect, useRef } from "react";
import { loadKey } from "@/services/helpers/storage";
import { settingsOptions } from "@/components/navbar/helpers/dropdownItems";
import type { Profile } from "@/utils/types/user/profile";
import { Link } from "@tanstack/react-router";

interface UserSettingsProps {
  className?: string;
  children: React.ReactNode;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);

  const profile = loadKey("profile") as Profile;
  const userName = profile?.name || "John Doe";
  const userEmail = profile?.email || "Inactive";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleMenuItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        containerRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Link
        ref={containerRef}
        to="/"
        onClick={(e) => {
          e.preventDefault();
          toggleDropdown();
        }}
        className="text-black dark:text-white hover:text-[var(--accent)] transition-colors duration-200 [&.active]:text-[var(--accent)]"
      >
        {children}
      </Link>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-200 rounded-lg shadow-lg w-44 dark:bg-[#0f0c29] dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="font-medium truncate">
              {userName}
              <br />
              {userEmail}
            </div>
          </div>

          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {settingsOptions().map(({ text, action }, index) => (
              <li key={index}>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleMenuItemClick(action)}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
