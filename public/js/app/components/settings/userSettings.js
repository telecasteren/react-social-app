import { loadKey } from "/js/utils/storage/loadKey.js";
import { handleClicks } from "/js/app/components/navbar/utils/navbarHandlers.js";
import { endDot } from "/js/utils/general/constants.js";
import { settingsOptions } from "/js/app/components/navbar/utils/dropdownItems.js";

export const createUserSettings = ({
  triggerType = "button",
  triggerText = "Settings",
  triggerClasses = "",
  containerClasses = "",
}) => {
  const container = document.createElement("div");
  container.className = `relative inline-block ${containerClasses}`;

  const trigger = document.createElement(triggerType);
  trigger.id = "dropdownInformationButton";
  trigger.setAttribute("data-dropdown-toggle", "dropdownInformation");
  trigger.className = `nav-hover-bg cursor-pointer text-black dark:text-white ${triggerClasses}`;
  trigger.innerHTML = triggerText + endDot;

  const dropdown = document.createElement("div");
  dropdown.id = "dropdownInformation";
  dropdown.className = `z-10 absolute hidden bg-white divide-y divide-gray-200 rounded-lg
   shadow-lg w-44 dark:bg-[#0f0c29] dark:divide-gray-600`;

  const userInfo = document.createElement("div");
  userInfo.className = "px-4 py-3 text-sm text-gray-600 dark:text-gray-400";
  const unsafeHTML = `<div class="font-medium truncate">${
    loadKey("profile")?.name || "Guest"
  }<br/>
  ${loadKey("profile")?.email || "Inactive"}</div>`;
  userInfo.innerHTML = DOMPurify.sanitize(unsafeHTML);

  const menuList = document.createElement("ul");
  menuList.className = "py-2 text-sm text-gray-700 dark:text-gray-200";
  menuList.setAttribute("aria-labelledby", "dropdownInformationButton");

  const items = settingsOptions();
  items.forEach(({ text, action }, index) => {
    const li = document.createElement("li");
    li.id = `settings-option-${index}`;
    li.className =
      "w-full text-black hover:text-accent-light dark:text-white dark:hover:text-accent-dark";
    const a = document.createElement("a");
    a.className =
      "block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer";
    a.textContent = text;
    li.appendChild(a);
    menuList.appendChild(li);
    if (!action) {
      li.addEventListener("click", (e) => {
        handleClicks(e, "/user/logout/", false);
        dropdown.classList.add("hidden");
      });
    }
  });

  dropdown.appendChild(userInfo);
  dropdown.appendChild(menuList);
  container.appendChild(trigger);
  container.appendChild(dropdown);

  trigger.addEventListener("click", () => {
    dropdown.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !container.contains(e.target)) {
      dropdown.classList.add("hidden");
    }
  });

  return container;
};

export const userSettings = () => {
  return createUserSettings({
    triggerType: "button",
    triggerText: "Settings",
  });
};
