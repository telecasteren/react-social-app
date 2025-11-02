import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export const useScrollRestore = (routePath: string) => {
  const navigate = useNavigate();

  useEffect(() => {
    const pageData = {
      cameFrom: routePath,
      scrollY: window.scrollY,
    };
    sessionStorage.setItem("previousPage", JSON.stringify(pageData));
  }, [routePath]);

  const navigateWithScroll = (to: string, extraSearch = {}) => {
    navigate({
      to,
      search: (previous) => ({
        ...previous,
        scrollY: window.scrollY,
        ...extraSearch,
      }),
    });
  };

  return { navigateWithScroll };
};
