// import { updateUnderline } from "./updateUnderline";

const isHTMLElement = (element: Element): element is HTMLElement => {
  return element instanceof HTMLElement;
};

export const initialUnderline = () => {
  const currentPath = window.location.pathname.replace(/\/+$/, "");

  if (currentPath === "/user/post") return;

  const liElements = Array.from(document.querySelectorAll("ul.active li"))
    .filter(isHTMLElement)
    .filter((el) => el.offsetParent !== null);

  for (const li of liElements) {
    const a = li.querySelector("a");
    if (!a) continue;

    const linkPath = new URL(a.href, window.location.origin).pathname.replace(
      /\/+$/,
      "",
    );
    if (linkPath === currentPath) {
      updateUnderline(li);
      break;
    }
  }
};
