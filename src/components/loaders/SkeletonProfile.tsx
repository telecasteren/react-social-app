import React from "react";

const SkeletonProfile: React.FC = () => {
  return (
    <div role="status" className="animate-pulse w-full p-5 mt-20 md:mt-40">
      {/* User */}
      <div className="flex items-center justify-center mb-4">
        <svg
          className="w-28 h-28 text-gray-200 dark:text-bg-dark3 me-4"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="w-20 md:w-40 h-2.5 bg-gray-200 rounded-full dark:bg-bg-dark3 me-3" />
        <div className="w-24 md:w-48 h-2 bg-gray-200 rounded-full dark:bg-bg-dark3" />
      </div>

      {/* Bio text */}
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-bg-dark3 max-w-[540px] mb-2.5 md:w-[740px]" />
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-bg-dark3 max-w-[640px] md:w-[840px] mb-2.5 mx-auto" />

      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default SkeletonProfile;
