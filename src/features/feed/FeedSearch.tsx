import { useSearch } from "@/hooks/feed/useSearch";
import SearchInput from "@/components/search/SearchInput";

interface FeedSearchProps {
  searchHook: ReturnType<typeof useSearch>;
}

export const FeedSearch = ({ searchHook }: FeedSearchProps) => {
  const {
    results: searchResults,
    hasResults,
    query,
    search,
    clearSearch,
    isLoading,
  } = searchHook;

  return (
    <>
      <SearchInput
        onSearch={search}
        onClear={clearSearch}
        placeholder={"Search posts..."}
        disabled={isLoading}
      />

      {query && (
        <p className="mt-4 text-sm text-gray-400">
          {hasResults
            ? `Got ${searchResults.length} results for "${query}"`
            : `No results found for "${query}"`}
        </p>
      )}
    </>
  );
};
