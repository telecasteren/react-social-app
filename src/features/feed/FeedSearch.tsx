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
    isLoading,
  } = searchHook;

  return (
    <>
      <SearchInput
        onSearch={search}
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
