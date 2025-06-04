import { loadKey } from "../../../utils/storage/loadKey.js";
import { userMessage } from "/js/utils/messages/userMessage.js";
import { initialUnderline } from "/js/app/components/navbar/updateUnderline.js";
import renderContent from "/js/app/ui/renderContent.js";

export default async function Navbar(auth) {
  const links = [
    { href: "/", text: "Welcome.", authOnly: false, guestOnly: true },
    { href: "/user/feed/", text: "Feed.", authOnly: true },
    { href: "/user/profile/", text: "Profile.", authOnly: true },
    { href: "/user/logout/", text: "Logout.", authOnly: true },
  ];

  function handleClicks(e, href, isProfile = false) {
    e.preventDefault();

    if (isProfile) {
      const profile = loadKey("profile");
      const currentUser = profile?.name;
      if (!currentUser) {
        userMessage("info", "Login to view your profile.");
        console.warn("No profile found in localStorage.");
        return;
      }
      href += `?id=${currentUser}`;
    }

    if (window.location.pathname + window.location.search !== href) {
      history.pushState(null, "", href);

      renderContent();
    }
  }

  function createNavLink({ text, href }, isMobile = false) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = text.replace(".", "");
    a.className = isMobile ? "mobile-nav-item" : "";

    a.addEventListener("click", (e) => {
      handleClicks(e, href, text.includes("Profile."));
    });

    return a;
  }

  function showLink(link) {
    if (link.authOnly && !auth) return false;
    if (link.guestOnly && auth) return false;
    return true;
  }

  function DesktopNav() {
    const nav = document.createElement("nav");
    nav.id = "desktop-nav";
    nav.className = "mt-20 ml-20 hidden md:block";

    const ul = document.createElement("ul");
    ul.className = "active flex space-x-8 dark:text-dark";

    links.forEach((link) => {
      if (!showLink(link)) return;

      const li = document.createElement("li");
      li.id = `nav-${link.text.toLowerCase().replace(/\s+/g, "-")}`;
      li.appendChild(createNavLink(link));
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    return nav;
  }

  function MobileNav() {
    const nav = document.createElement("nav");
    nav.id = "mobile-nav";
    nav.className =
      "fixed top-0 left-0 right-0 z-40 bg-transparent transition-background-color duration-300";

    const container = document.createElement("div");
    container.className =
      "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4";

    const logoLink = document.createElement("a");
    logoLink.href = "#";
    logoLink.className = "flex items-center space-x-3 rtl:space-x-reverse";

    const logoImg = document.createElement("img");
    logoImg.src = "/resources/logo/logo-pizza.png";
    logoImg.className = "h-8 dark:invert";
    logoImg.alt = "Foodiegram logo";

    const logoText = document.createElement("span");
    logoText.className =
      "self-center text-2xl font-200 whitespace-nowrap dark:text-white";
    logoText.textContent = "Foodiegram.";

    logoLink.appendChild(logoImg);
    logoLink.appendChild(logoText);

    const menuButton = document.createElement("button");
    menuButton.setAttribute("data-collapse-toggle", "navbar-hamburger");
    menuButton.type = "button";
    menuButton.className = `
      inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg
      hover:bg-accent focus:outline-none focus:ring-2 focus:ring-gray-200
      dark:text-gray-400 dark:hover:bg-accent-dark dark:focus:ring-gray-600`;
    menuButton.setAttribute("aria-controls", "navbar-hamburger");
    menuButton.setAttribute("aria-expanded", "false");

    const srText = document.createElement("span");
    srText.className = "sr-only";
    srText.textContent = "Open main menu";

    const menuIcon = document.createElement("img");
    menuIcon.className = "dark:invert dark:hover:invert-0";
    menuIcon.src = "/resources/icons/hamburger-icon-f.png";
    menuIcon.alt = "Navigation menu";

    menuButton.appendChild(srText);
    menuButton.appendChild(menuIcon);

    const menuContainer = document.createElement("div");
    menuContainer.id = "navbar-hamburger";
    menuContainer.className = "hidden w-full bg-white dark:bg-bg-dark3";

    const menuList = document.createElement("ul");
    menuList.className = "flex flex-col font-medium mt-4 rounded-lg";

    links.forEach((link) => {
      if (!showLink(link)) return;

      const li = document.createElement("li");
      li.className = "menuLi";

      const a = createNavLink(link, true);

      if (window.location.pathname === link.href) {
        a.classList.add("current-mobile-nav-item");
      }

      a.addEventListener("click", () => {
        menuContainer.classList.add("hidden");
      });

      li.appendChild(a);
      menuList.appendChild(li);
    });

    menuContainer.appendChild(menuList);
    container.appendChild(logoLink);
    container.appendChild(menuButton);
    container.appendChild(menuContainer);
    nav.appendChild(container);

    menuButton.addEventListener("click", () =>
      menuContainer.classList.toggle("hidden")
    );

    document.addEventListener("click", (e) => {
      if (!menuButton.contains(e.target) && !nav.contains(e.target)) {
        menuContainer.classList.add("hidden");
      }
    });

    return nav;
  }

  const desktopNav = DesktopNav();
  const mobileNav = MobileNav();

  document.body.prepend(mobileNav);
  document.body.prepend(desktopNav);

  initialUnderline(links);
  window.addEventListener("resize", () => initialUnderline(links));

  function handleScreenChange() {
    if (window.innerWidth > 767) {
      desktopNav.classList.remove("hidden");
      mobileNav.classList.add("hidden");
    } else {
      desktopNav.classList.add("hidden");
      mobileNav.classList.remove("hidden");
    }
  }
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
}
