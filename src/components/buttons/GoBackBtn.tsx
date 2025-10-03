import React from "react";

const GoBackBtn: React.FC = () => {
  const handleGoBack = () => {
    const data = JSON.parse(sessionStorage.getItem("previousPage") || "{}");
    const cameFrom = data.cameFrom || "";

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
  };

  return (
    <div
      className="back-btn text-md mt-4 underline hover:underline-none hover:text-[var(--accent)] cursor-pointer"
      onClick={handleGoBack}
    >
      ← Go back
    </div>
  );
};
export default GoBackBtn;
