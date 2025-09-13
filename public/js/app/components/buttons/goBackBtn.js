export const goBackBtn = () => {
  const data = JSON.parse(sessionStorage.getItem("previousPage") || "{}");
  const cameFrom = data.cameFrom || "";

  const backBtn = document.createElement("div");
  backBtn.className = `text-md mt-4 underline hover:underline-none hover:text-[var(--accent)] cursor-pointer`;
  backBtn.textContent =
    `← Back to ${cameFrom?.includes("/user/feed/") ? "feed" : "profile"}` ||
    "← Go back";

  backBtn.addEventListener("click", () => {
    if (
      cameFrom?.startsWith("/user/feed/") ||
      cameFrom?.startsWith("/user/profile/")
    ) {
      sessionStorage.setItem("restoreScroll", data.scrollY);
    }
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/user/feed/";
    }
  });

  return backBtn;
};
