import { useState, useCallback } from "react";
import { searchAllPosts } from "@/services/api/search/searchAllPosts";
import type { Post } from "@/utils/types/post/post";

export const useSearch = () => {
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const hasResults = results.length > 0;

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setQuery("");
      return;
    }

    setIsLoading(true);
    setError(null);
    setQuery(searchQuery);

    try {
      const response = await searchAllPosts(searchQuery.trim().toLowerCase());
      const searchResults = response.data || response;
      setResults(searchResults);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Search failed");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setResults([]);
    setQuery("");
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    query,
    search,
    clearSearch,
    hasResults,
  };
};
