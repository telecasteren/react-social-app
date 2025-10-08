// import { updateUnderline } from "/js/app/components/navbar/utils/updateUnderline.js";

// export const initialUnderline = (links) => {
//   const currentPath = window.location.pathname.replace(/\/+$/, "");

//   if (currentPath === "/user/post") return;

//   const liElements = Array.from(
//     document.querySelectorAll("ul.active li")
//   ).filter((el) => el.offsetParent !== null);

//   for (const li of liElements) {
//     const a = li.querySelector("a");
//     if (!a) continue;

//     const linkPath = new URL(a.href, window.location.origin).pathname.replace(
//       /\/+$/,
//       ""
//     );
//     if (linkPath === currentPath) {
//       updateUnderline(li);
//       break;
//     }
//   }
// };
