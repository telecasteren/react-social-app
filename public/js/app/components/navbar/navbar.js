import { initialUnderline } from "/js/app/components/navbar/updateUnderline.js";
import { MobileNav } from "/js/app/components/navbar/MobileNav.js";
import { DesktopNav } from "/js/app/components/navbar/DesktopNav.js";

const Navbar = async (auth) => {
  const links = [
    { href: "/", text: "Welcome", authOnly: false, guestOnly: true },
    { href: "/user/feed/", text: "Feed", authOnly: true },
    { href: "/user/profile/", text: "Profile", authOnly: true },
    { text: "Settings", authOnly: true, isDropdown: true },
  ];

  const desktopNav = DesktopNav(auth, links);
  const mobileNav = MobileNav(auth, links);

  document.body.prepend(mobileNav);
  document.body.prepend(desktopNav);

  initialUnderline(links);
  window.addEventListener("resize", () => initialUnderline(links));

  const handleScreenChange = () => {
    if (window.innerWidth > 767) {
      desktopNav.classList.remove("hidden");
      mobileNav.classList.add("hidden");
    } else {
      desktopNav.classList.add("hidden");
      mobileNav.classList.remove("hidden");
    }
  };
  window.addEventListener("resize", handleScreenChange);
  handleScreenChange();

  let scrollStarted = false;
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (!scrollStarted) {
      scrollStarted = true;
      mobileNav.classList.remove("bg-transparent");
      mobileNav.classList.add("bg-white", "dark:bg-bg-dark3");
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollStarted = false;
      if (scrollPosition === 0) {
        mobileNav.classList.remove("bg-white", "dark:bg-bg-dark3");
        mobileNav.classList.add("bg-transparent");
      }
    }, 100);
  });
};
export default Navbar;
