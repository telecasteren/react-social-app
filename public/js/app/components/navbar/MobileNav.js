import {
  createNavLink,
  showLink,
  endDot,
} from "/js/app/components/navbar/utils/createAndShowLink.js";

export function MobileNav(auth, links) {
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
  logoText.innerHTML = "Foodiegram" + endDot;

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
    if (!showLink(link, auth)) return;

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
