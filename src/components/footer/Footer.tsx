import React from "react";
import { SITE_LOGO_NAME, SITE_NAME } from "@/utils/general/config";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-10 mb-10 text-tiny flex gap-6 flex-wrap items-center justify-center dark:text-dark">
      <p id="footer-copyright">{`2025-${currentYear}`}</p>
      <img
        // className="dark:invert"
        src={SITE_LOGO_NAME}
        alt={`${SITE_NAME} logo`}
        width={80}
        height={80}
      />
    </footer>
  );
};
export default Footer;
