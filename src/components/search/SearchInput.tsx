import React, { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { SearchInputProps } from "@/utils/types/search/SearchInput";

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search posts..",
  disabled = false,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchValue.trim() && onSearch) {
      onSearch(searchValue.trim());
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <form className="max-w-md" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>

      <div className="relative w-full sm:w-[250px] md:w-[300px] lg:w-[350px]">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          id="default-search"
          value={searchValue}
          onChange={handleInputChange}
          disabled={disabled}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:border-none dark:bg-[#0f0c29] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={placeholder}
          required
        />

        <button
          type="submit"
          id="search-btn"
          disabled={disabled}
          className="absolute inset-y-0 end-0 flex items-center m-2 pl-2 pr-2 bg-accent-light dark:bg-accent-dark hover:brightness-110 text-sm text-black rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchInput;
