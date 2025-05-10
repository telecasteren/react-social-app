import setTheme from "/js/utils/theme/colorMode.js";
import Navbar from "/js/app/components/navbar/navbar.js";
import Footer from "/js/app/components/footer/footer.js";
import renderContent from "/js/app/ui/renderContent.js";
import { createSingleCard } from "/js/app/routes/feed/cards/createSingleCard.js";
import { setMetaDescriptions } from "/js/utils/general/setMetaDesc.js";
import { setPageTitles } from "/js/utils/general/setPageTitles.js";

document.addEventListener("DOMContentLoaded", () => {
  setMetaDescriptions();
  setPageTitles();
  // RENDER TOP CONTENT:
  setTheme();
  Navbar();

  // RENDER MAIN CONTENT:
  renderContent();

  // RENDER BOTTOM CONTENT:
  Footer();

  /** Loads posts from localStorage */
  function loadPosts() {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const cardContainer = document.querySelector(".card-container");

    storedPosts.forEach((post) => {
      const postCard = createSingleCard(post);
      cardContainer.appendChild(postCard);
    });
  }
  document.addEventListener("DOMContentLoaded", loadPosts);
});
