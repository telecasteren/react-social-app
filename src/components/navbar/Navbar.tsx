import { useInitialUnderline } from "@/components/navbar/utils/initialUnderline";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import DesktopNavContent from "@/components/navbar/components/DesktopNavContent";
import MobileNavContent from "@/components/navbar/components/MobileNavContent";
import type { NavLink } from "./types/types";
import { useNavScrollEffect } from "@/hooks/useNavScrollEffect";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const { isAuthenticated } = useAuth();
  const navRef = useInitialUnderline();

  const isScrolled = useNavScrollEffect();
  const bgColorChange = isScrolled
    ? "bg-stone-50 dark:bg-bg-dark3"
    : "bg-transparent";

  const links: NavLink[] = [
    { href: "/", text: "Welcome", authOnly: false, guestOnly: true },
    { href: "/user/feed", text: "Feed", authOnly: true },
    { href: "/user/profile", text: "Profile", authOnly: true },
    { href: "#", text: "Settings", authOnly: true, isDropdown: true },
  ];

  useEffect(() => {
    const handleSizeChange = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleSizeChange);
    return () => window.removeEventListener("resize", handleSizeChange);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-40">
      {isMobile ? (
        <MobileNavContent
          className={bgColorChange}
          auth={isAuthenticated}
          links={links}
        />
      ) : (
        <DesktopNavContent
          className={bgColorChange}
          auth={isAuthenticated}
          links={links}
          navRef={navRef}
        />
      )}
    </nav>
  );
};
export default Navbar;
