import { getUserParams } from "@/services/helpers/getUserParams";
import { loadKey } from "@/services/helpers/storage";

export const updateUnderline = async (targetLi: HTMLLIElement) => {
  const currentUrl = window.location.pathname;
  let showUnderline = true;

  if (currentUrl.includes("/user/profile")) {
    const currentUser = loadKey("profile")?.name;
    let visitedProfile;
    try {
      const profileData = await getUserParams();
      visitedProfile = profileData?.name;
    } catch (error) {
      showUnderline = false;
      throw error;
    }
    if (visitedProfile !== currentUser) {
      showUnderline = false;
    }
  }
  if (!showUnderline) return;

  const ulEl = document.querySelector("ul.active");
  if (!ulEl || !(ulEl instanceof HTMLElement)) return;

  const underlineLeft = parseFloat(
    getComputedStyle(ulEl).getPropertyValue("--underline-left") || "0",
  );
  const underlineWidth = parseFloat(
    getComputedStyle(ulEl).getPropertyValue("--underline-width") || "0",
  );

  const { offsetLeft: targetLeft, offsetWidth: targetWidth } = targetLi;

  let startTime: number | null = null;
  const steps = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / 300, 1);

    const newLeft = underlineLeft + (targetLeft - underlineLeft) * progress;
    const newWidth = underlineWidth + (targetWidth - underlineWidth) * progress;

    ulEl.style.setProperty("--underline-left", `${newLeft}px`);
    ulEl.style.setProperty("--underline-width", `${newWidth}px`);

    if (progress < 1) {
      requestAnimationFrame(steps);
    }
  };

  requestAnimationFrame(steps);
};
