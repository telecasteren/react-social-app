import React, { useState, useRef, useEffect } from "react";
import type { SortOptionsProps } from "@/utils/types/search/SortOptions";

const SortOptions: React.FC<SortOptionsProps> = ({
  triggerType = "button",
  triggerText = "Sort options",
  triggerClasses = "",
  containerClasses = "w-full flex flex-wrap relative w-fit",
  onSortByCreated,
  onSortByLikes,
  onSortByComments,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortOption = (sortType: "created" | "likes" | "comments") => {
    switch (sortType) {
      case "created":
        onSortByCreated?.();
        break;
      case "likes":
        onSortByLikes?.();
        break;
      case "comments":
        onSortByComments?.();
        break;
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        containerRef.current &&
        !dropdownRef.current.contains(target) &&
        !containerRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const defaultButtonClasses =
    triggerClasses ||
    `font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center text-gray-800
    bg-gray-50 hover:bg-gray-100 border border-gray-300 focus:ring-1 focus:outline-none focus:ring-blue-300
    dark:bg-[#0f0c29] dark:hover:brightness-110 dark:border-none dark:text-gray-400`;

  const defaultSpanClasses = triggerClasses || "cursor-pointer hover:underline";

  const sortItems = [
    { text: "Most recent", handler: () => handleSortOption("created") },
    { text: "Most likes", handler: () => handleSortOption("likes") },
    { text: "Most comments", handler: () => handleSortOption("comments") },
  ];

  return (
    <div className={containerClasses} ref={containerRef}>
      {triggerType === "button" ? (
        <button
          type="button"
          id="dropdownInformationButton"
          className={defaultButtonClasses}
          onClick={handleTriggerClick}
          data-dropdown-toggle="dropdownInformation"
        >
          {triggerText}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      ) : (
        <span className={defaultSpanClasses} onClick={handleTriggerClick}>
          {triggerText}
        </span>
      )}

      <div
        id="dropdownInformation"
        ref={dropdownRef}
        className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-[#0f0c29] dark:divide-gray-600 ${
          isDropdownOpen ? "" : "hidden"
        }`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div className="font-medium truncate">Filter posts by:</div>
        </div>

        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton"
        >
          {sortItems.map((item, index) => (
            <li
              key={index}
              className="w-full text-black hover:text-accent-light dark:text-white dark:hover:text-accent-dark"
              onClick={item.handler}
            >
              <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SortOptions;
