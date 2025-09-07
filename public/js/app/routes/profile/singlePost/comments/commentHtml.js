import { formatDate } from "/js/utils/general/formatDate.js";

export function commentHtml(comment) {
  const container = document.createElement("div");
  container.id = "comment-container";
  container.setAttribute("data-comment-id", comment.id);
  container.className = "flex flex-wrap items-center gap-x-2";

  const img = document.createElement("img");
  img.className =
    "w-8 h-8 rounded-full object-cover border border-accent-light dark:border-accent-dark";
  img.src = comment.author.avatar.url || "/resources/icons/no-avatar-img.jpg";
  img.alt = comment.author.avatar.alt || "No profile image found.";

  const textContainer = document.createElement("div");
  textContainer.className =
    "flex flex-col ml-[42px] w-full max-w-[320px] leading-1.5";

  const header = document.createElement("div");
  header.className = "flex items-center space-x-2 rtl:space-x-reverse";

  const linkTitle = document.createElement("a");
  linkTitle.href = `/user/profile/?id=${comment.author.name}`;

  const nameSpan = document.createElement("span");
  nameSpan.className =
    "text-sm font-semibold text-gray-900 dark:text-white hover:text-accent-light hover:dark:text-accent-dark";
  nameSpan.textContent = comment.author.name || "Unknown User";
  linkTitle.appendChild(nameSpan);
  header.appendChild(linkTitle);

  const timeSpan = document.createElement("span");
  timeSpan.className = "text-tiny font-normal text-gray-500 dark:text-gray-400";
  timeSpan.textContent = `Delivered ${formatDate(comment.created)}`;

  const message = document.createElement("p");
  message.className = "text-sm font-normal py-2 text-gray-900 dark:text-white";
  message.textContent = comment.body;

  textContainer.appendChild(message);
  textContainer.appendChild(timeSpan);

  container.appendChild(img);
  container.appendChild(header);
  container.appendChild(textContainer);

  return container;
}
