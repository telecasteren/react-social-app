export const updateUnderline = (targetLi) => {
  const ulEl = document.querySelector("ul.active");
  if (!ulEl) return;

  const underlineLeft = parseFloat(
    getComputedStyle(ulEl).getPropertyValue("--underline-left") || "0"
  );
  const underlineWidth = parseFloat(
    getComputedStyle(ulEl).getPropertyValue("--underline-width") || "0"
  );

  const { offsetLeft: targetLeft, offsetWidth: targetWidth } = targetLi;

  let startTime = null;
  const steps = (timestamp) => {
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

export const initialUnderline = (links) => {
  const currentPath = window.location.pathname.replace(/\/+$/, "");

  if (currentPath === "/user/post") return;

  const liElements = Array.from(
    document.querySelectorAll("ul.active li")
  ).filter((el) => el.offsetParent !== null);

  for (const li of liElements) {
    const a = li.querySelector("a");
    if (!a) continue;

    const linkPath = new URL(a.href, window.location.origin).pathname.replace(
      /\/+$/,
      ""
    );
    if (linkPath === currentPath) {
      updateUnderline(li);
      break;
    }
  }
};
