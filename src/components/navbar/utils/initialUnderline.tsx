import { useEffect, useRef } from "react";
import { updateUnderline } from "./updateUnderline";

export const useInitialUnderline = () => {
  const navRef = useRef<HTMLUListElement>(null);

  const handleUnderline = () => {
    const currentPath = window.location.pathname.replace(/\/+$/, "");

    if (currentPath === "/user/post") return;

    const liElements = Array.from(
      navRef.current?.querySelectorAll("li") ?? [],
    ).filter(
      (el): el is HTMLLIElement =>
        el instanceof HTMLLIElement && el.offsetParent !== null,
    );

    for (const li of liElements) {
      const a = li.querySelector("a");
      if (!a) continue;

      const linkPath = new URL(a.href, window.location.origin).pathname.replace(
        /\/+$/,
        "",
      );
      if (linkPath === currentPath) {
        updateUnderline(li);
        break;
      }
    }
  };

  useEffect(() => {
    handleUnderline();
    window.addEventListener("resize", handleUnderline);

    return () => {
      window.removeEventListener("resize", handleUnderline);
    };
  }, []);

  return navRef;
};
