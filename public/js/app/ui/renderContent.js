import Dashboard from "/js/app/routes/dashboard/createDashboard.js";
import Feed from "/js/app/routes/feed/createFeed.js";
import Profile from "/js/app/routes/profile/createProfile.js";
import SinglePost from "/js/app/routes/profile/singlePost/singlePost.js";
import { updateUnderline } from "/js/app/components/navbar/updateUnderline.js";
import { displayAuthForms } from "/js/app/events/authForm/displayAuthForms.js";
import { createCards } from "/js/app/routes/feed/createCards.js";
import { createPostMenuEvents } from "/js/app/events/newPost/formMenu/menuHandlers.js";
import { openPost } from "/js/app/events/profile/goToPost.js";
import { likePosts } from "/js/app/events/userActions/likes.js";
import { createSkeletonCards } from "/js/app/components/loader/skeletonCard.js";
import { createSkeletonProfile } from "/js/app/components/loader/skeletonProfile.js";
import { spinner } from "/js/app/components/loader/spinner.js";
import { isAuthenticated } from "/js/utils/source/api/auth/isAuthenticated.js";

/**
 * Renders the content of the page based on the current URL path.
 * This function dynamically imports and appends components to specific
 * container elements in the DOM. It also handles initial loading states
 * with skeleton loaders and updates the navigation underline.
 * It listens for 'popstate' events to handle browser navigation (back/forward).
 */
export default async function renderContent() {
  /**
   * Renders the appropriate page content based on the current window location.
   * It identifies content containers and updates their innerHTML with components
   * based on the URL path. It also manages loading states and navigation highlighting.
   */
  async function renderPage() {
    const authContent = document.getElementById("auth-content");
    const profileContent = document.getElementById("profile-content");
    const postContent = document.getElementById("post-content");
    const feedContent = document.getElementById("feed-content");
    const path = window.location.pathname;

    if (authContent) {
      authContent.innerHTML = "";
      authContent.style.display = "none";
    }
    if (profileContent) {
      profileContent.innerHTML = "";
      profileContent.style.display = "none";
    }
    if (postContent) {
      postContent.innerHTML = "";
      postContent.style.display = "none";
    }
    if (feedContent) {
      feedContent.innerHTML = "";
      feedContent.style.display = "none";
    }

    switch (path) {
      case "/":
        if (authContent) {
          authContent.style.display = "block";
          authContent.appendChild(Dashboard());
          displayAuthForms();
        }
        break;

      case "/user/feed/":
      case "/user/profile/":
      case "/user/post/":
        const authenticated = await isAuthenticated();
        if (!authenticated && path.startsWith("/user/")) {
          window.location.href = "/";
          return;
        }

        if (path === "/user/feed/" && feedContent) {
          feedContent.style.display = "block";
          const skeletons = createSkeletonCards();
          feedContent.appendChild(skeletons);

          setTimeout(async () => {
            feedContent.innerHTML = "";
            feedContent.prepend(Feed());
            const Posts = await createCards();
            feedContent.appendChild(Posts);
            createPostMenuEvents();
            openPost();
          }, 1000);
        }

        if (path === "/user/profile/" && profileContent) {
          profileContent.style.display = "block";
          profileContent.appendChild(createSkeletonProfile());

          setTimeout(async () => {
            profileContent.innerHTML = "";
            const profileElement = await Profile();
            profileContent.appendChild(profileElement);
            createPostMenuEvents();
            openPost();
          }, 1000);
        }

        if (path === "/user/post/" && postContent) {
          postContent.style.display = "block";
          postContent.appendChild(spinner());

          setTimeout(async () => {
            postContent.innerHTML = "";
            const post = await SinglePost();
            postContent.appendChild(post);
            likePosts();
          }, 1000);
        }
        break;

      default:
        const notFoundPage = document.body;
        notFoundPage.innerHTML = `<h1 class="flex justify-center items-center text-center text-white bg-black">404 - Page Not Found</h1>`;
        break;
    }

    const currentPath = window.location.pathname;
    const navId = `nav-${
      currentPath === "/"
        ? "dashboard"
        : currentPath.split("/").filter(Boolean).pop()
    }`;
    const currentNavEl = document.getElementById(navId);
    if (currentNavEl) updateUnderline(currentNavEl);
  }

  window.addEventListener("popstate", renderPage);
  renderPage();

  window.scrollTo({ top: 0, behavior: "smooth" });
}
