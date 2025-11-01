import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import DesktopNavContent from "@/components/navbar/components/DesktopNavContent";
import MobileNavContent from "@/components/navbar/components/MobileNavContent";
import type { NavLink } from "../../utils/types/navbar/types";
import { useNavScrollEffect } from "@/hooks/useNavScrollEffect";
import { loadKey } from "@/services/helpers/storage";
import type { Profile } from "@/utils/types/user/profile";

const Navbar = () => {
  const currentUser = loadKey("profile") as Profile;
  const username = currentUser?.name || "";

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const { auth } = useAuth();

  const isScrolled = useNavScrollEffect();
  const bgColorChange = isScrolled
    ? "bg-stone-50 dark:bg-bg-dark3"
    : "bg-transparent";

  const links: NavLink[] = [
    { href: "/", text: "Welcome", authOnly: false, guestOnly: true },
    { href: "/user/feed/explore", text: "Feed", authOnly: true },
    { href: `/user/profile/${username}`, text: "Profile", authOnly: true },
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
          auth={auth.isAuthenticated}
          links={links}
        />
      ) : (
        <DesktopNavContent
          className={bgColorChange}
          auth={auth.isAuthenticated}
          links={links}
        />
      )}
    </nav>
  );
};
export default Navbar;
