const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footer = document.createElement("footer");
  footer.className =
    "footer mt-10 mb-10 text-tiny flex gap-6 flex-wrap items-center justify-center dark:text-dark";

  const copyright = document.createElement("p");
  copyright.id = "footer-copyright";
  copyright.textContent = `2025-${currentYear}`;

  const img = document.createElement("img");
  img.className = "dark:invert";
  img.src = "/resources/logo/foodiegram-logo.png";
  img.alt = "";
  img.width = 80;
  img.height = 80;

  footer.appendChild(copyright);
  footer.appendChild(img);

  document.body.appendChild(footer);
};
export default Footer;
