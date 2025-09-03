export function setScrollHandler(newHandler) {
  if (window._scrollHandler) {
    window.removeEventListener("scroll", window._scrollHandler);
  }

  window._scrollHandler = newHandler;
  window.addEventListener("scroll", newHandler);
}

export function removeScrollHandler(handler) {
  window.removeEventListener("scroll", handler);
}
