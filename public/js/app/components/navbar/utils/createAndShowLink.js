import { handleClicks } from "/js/app/components/navbar/utils/navbarHandlers.js";
export const endDot = `<span style="color: var(--accent); font-size: 25px;">.</span>`;
import { userSettings } from "/js/app/components/settings/userSettings.js";

export const createNavLink = ({ text, href }, isMobile = false) => {
  // Settings dropdown nav link
  if (text === "Settings") {
    return userSettings();
  }

  // Regular nav links
  const a = document.createElement("a");
  a.href = href;
  a.innerHTML = text + endDot;
  a.className = isMobile ? "mobile-nav-item" : "";

  a.addEventListener("click", (e) => {
    handleClicks(e, href, text == "Profile");
  });
  return a;
};

export const showLink = (link, auth) => {
  if (link.authOnly && !auth) return false;
  if (link.guestOnly && auth) return false;
  return true;
};
