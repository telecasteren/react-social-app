import { createTitle } from "/js/app/components/titles/title.js";

export function createEditIcon({
  label = "Edit",
  classes = "",
  dataId = null,
  onClick = null,
}) {
  const helpText = createTitle(label);
  helpText.className = `ml-2 whitespace-nowrap opacity-0 transition-opacity duration-300 text-[0.8rem] text-white`;

  helpText.classList.add("group-hover:opacity-100");

  const container = document.createElement("div");
  container.className = classes;
  if (dataId) container.setAttribute("data-id", dataId);

  const svgIcon = document.createElement("div");
  svgIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.862 3.487a2.125 2.125 0 0 1 3.001 3.001l-1.127 1.127-3.001-3.001 1.127-1.127zM14.993 5.356l3.001 3.001L7.5 18.85H4.5v-3L14.993 5.356z"/>
    </svg>
  `;

  container.appendChild(svgIcon);
  container.appendChild(helpText);

  if (onClick) {
    container.addEventListener("click", onClick);
  }

  return container;
}
