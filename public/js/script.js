import setTheme from "/js/utils/theme/colorMode.js";
import Navbar from "/js/app/components/navbar/navbar.js";
import Footer from "/js/app/components/footer/footer.js";
import renderContent from "/js/app/ui/renderContent.js";
import { setMetaDescriptions } from "/js/utils/general/setMetaDesc.js";
import { setPageTitles } from "/js/utils/general/setPageTitles.js";
import { API_TOKEN } from "/js/utils/source/api/general/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("token", JSON.stringify(API_TOKEN));

  // GENERAL
  setMetaDescriptions();
  setPageTitles();
  setTheme();

  // CONTENT
  Navbar();
  renderContent();
  Footer();
});
