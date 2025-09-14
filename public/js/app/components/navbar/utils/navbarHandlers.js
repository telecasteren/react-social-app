import { loadKey } from "/js/utils/storage/loadKey.js";
import renderContent from "/js/app/ui/renderContent.js";
import Logout from "/js/utils/storage/logout.js";
import { userMessage } from "/js/utils/messages/userMessage.js";
import {
  toggleModal,
  closeModal,
} from "/js/app/components/modal/createModal.js";

export const handleClicks = (e, href, isProfile = false) => {
  e.preventDefault();

  if (href === "/") {
    if (window.location.pathname === "/") {
      window.location.reload();
      return;
    }
    window.location.assign("/");
    return;
  }

  if (href === "/user/logout/") {
    const logoutContainer = document.createElement("div");
    logoutContainer.className =
      "flex flex-wrap items-center justify-self-center w-[200px]";
    const logoutMessage = document.createElement("p");
    logoutMessage.className = "text-black text-medium m-4";
    logoutMessage.textContent = "Logging out";
    logoutContainer.appendChild(logoutMessage);

    toggleModal(logoutContainer);
    if (logoutContainer) {
      const closeBtn = document.querySelector(".close-modal");
      const modalContent = document.querySelector(".modal-content");
      closeBtn.style.opacity = "0";
      modalContent.style.width = "40%";
    }

    let dots = 0;
    let maxDots = 3;
    const dotInterval = setInterval(() => {
      dots = (dots + 1) % (maxDots + 1);
      logoutMessage.textContent = "Logging out" + " . ".repeat(dots);
    }, 400);

    setTimeout(() => {
      clearInterval(dotInterval);
      Logout();
      closeModal();
    }, 3000);

    return;
  }

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
};
