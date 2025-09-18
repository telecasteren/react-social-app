import {
  createNavLink,
  showLink,
} from "/js/app/components/navbar/utils/createAndShowLink.js";
import { SITE_NAME, SITE_LOGO_NAME } from "/js/utils/general/constants.js";

export const DesktopNav = (auth, links) => {
  const nav = document.createElement("nav");
  nav.id = "desktop-nav";
  nav.className = `fixed md:flex items-center justify-between flex-wrap
  p-[2.5rem] z-40 w-full bg-transparent transition-background-color duration-300`;

  const logo = document.createElement("div");
  logo.className = "";

  const logoImg = document.createElement("img");
  logoImg.className = "w-32 flex justify-end dark:invert";
  logoImg.src = SITE_LOGO_NAME;
  logoImg.alt = `Logo: ${SITE_NAME} | A slice of life`;
  logo.appendChild(logoImg);

  logoImg.addEventListener("click", () => {
    window.location.assign("/user/feed/");
  });

  const ul = document.createElement("ul");
  ul.className = "active flex space-x-8 dark:text-dark";

  links.forEach((link) => {
    if (!showLink(link, auth)) return;

    const li = document.createElement("li");
    li.id = `nav-${link.text.toLowerCase().replace(/\s+/g, "-")}`;
    li.appendChild(createNavLink(link));
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  nav.appendChild(logo);

  return nav;
};
