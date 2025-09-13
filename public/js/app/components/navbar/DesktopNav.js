import {
  createNavLink,
  showLink,
} from "/js/app/components/navbar/utils/createAndShowLink.js";

export const DesktopNav = (auth, links) => {
  const nav = document.createElement("nav");
  nav.id = "desktop-nav";
  nav.className =
    "hidden md:flex items-center justify-between flex-wrap mt-20 mx-20";

  const logo = document.createElement("div");
  logo.className = "";

  const logoImg = document.createElement("img");
  logoImg.className = "w-32 flex justify-end dark:invert";
  logoImg.src = "/resources/logo/foodiegram-logo.png";
  logoImg.alt = "Logo: Foodiegram | A slice of life";
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
