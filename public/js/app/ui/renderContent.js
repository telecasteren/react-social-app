import Dashboard from "/js/app/routes/dashboard/createDashboard.js";
import Feed from "/js/app/routes/feed/createFeed.js";
import Profile from "/js/app/routes/profile/createProfile.js";
import SinglePost from "/js/app/routes/profile/singlePost/singlePost.js";
import { updateUnderline } from "/js/app/components/navbar/updateUnderline.js";
import { displayAuthForms } from "/js/app/events/authForm/displayAuthForms.js";
import { createCards } from "/js/app/routes/feed/createCards.js";
import { createPostMenuEvents } from "/js/app/events/feed/createPost/createPostMenuEvents.js";
import { openPost } from "/js/app/events/profile/goToPost.js";
import { createSkeletonCard } from "/js/app/components/loader/skeletonCard.js";
import { createSkeletonProfile } from "/js/app/components/loader/skeletonProfile.js";
import { spinner } from "/js/app/components/loader/spinner.js";

export default function renderContent() {
  function renderPage() {
    const authContent = document.getElementById("auth-content");
    const profileContent = document.getElementById("profile-content");
    const postContent = document.getElementById("post-content");
    const feedContent = document.getElementById("feed-content");

    // Make sure the container exist first
    if (!authContent && !profileContent && !feedContent && !postContent) return;

    switch (window.location.pathname) {
      case "/":
        if (authContent) {
          authContent.innerHTML = "";
          authContent.appendChild(Dashboard());
          displayAuthForms();
        }
        break;
      case "/user/feed/":
        if (feedContent) {
          for (let i = 0; i < 3; i++) {
            feedContent.appendChild(createSkeletonCard());
          }

          setTimeout(() => {
            feedContent.innerHTML = "";
            feedContent.prepend(Feed());
            feedContent.appendChild(createCards());
            createPostMenuEvents();
            openPost();
          }, 1000);
        }
        break;
      case "/user/profile/":
        if (profileContent) {
          profileContent.appendChild(createSkeletonProfile());

          setTimeout(() => {
            profileContent.innerHTML = "";
            profileContent.appendChild(Profile());
            openPost();
          }, 1000);
        }
        break;
      case "/user/post/":
        if (postContent) {
          postContent.appendChild(spinner());

          setTimeout(() => {
            postContent.innerHTML = "";
            postContent.appendChild(SinglePost());
          }, 1000);
        }
        break;
      default:
        if (authContent) {
          authContent.innerHTML = "";
          authContent.appendChild(Dashboard());
          displayAuthForms();
        }
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
}
