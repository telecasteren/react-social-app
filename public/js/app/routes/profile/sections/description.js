import { toggleFollowing } from "/js/app/events/userActions/following/follows.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import { editDescription } from "/js/app/components/forms/bioForm.js";
import { createTitle } from "/js/app/components/titles/title.js";

export default async function Description(user) {
  const currentUser = loadKey("profile");

  let followBtn = null;
  if (currentUser.name !== user.name) {
    followBtn = await toggleFollowing(user);
  }

  const userDescription = document.createElement("div");
  userDescription.className = "grid grid-cols-1 mt-16 mb-16";

  const bioRow = document.createElement("div");
  bioRow.className = "flex items-center justify-center gap-4";

  const description = document.createElement("p");
  description.innerText = user.bio || "No bio yet..";
  description.className = "text-sm m-2";
  bioRow.appendChild(description);

  const helpText = createTitle("Edit");
  helpText.className = `ml-2 whitespace-nowrap opacity-0 transition-opacity duration-300 text-[0.8rem] text-white`;

  const editBioIcon = document.createElement("div");
  editBioIcon.className = `
    edit-post pl-2 pr-2 w-10 hover:w-24 h-10
    bg-gray-800 dark:bg-[#181438e3] hover:bg-gray-600 hover:dark:bg-[#534ba5e3]
    rounded shadow-md cursor-pointer flex items-center justify-start
    overflow-hidden transition-all duration-300 group
  `;

  const svgIcon = document.createElement("div");
  svgIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.862 3.487a2.125 2.125 0 0 1 3.001 3.001l-1.127 1.127-3.001-3.001 1.127-1.127zM14.993 5.356l3.001 3.001L7.5 18.85H4.5v-3L14.993 5.356z"/>
    </svg>
  `;

  editBioIcon.appendChild(svgIcon);
  editBioIcon.appendChild(helpText);

  if (currentUser.name === user.name) {
    helpText.classList.add("group-hover:opacity-100");
    bioRow.appendChild(editBioIcon);

    editBioIcon.addEventListener("click", async () => {
      const bioEditForm = await editDescription(user);
      userDescription.replaceWith(bioEditForm);
    });
  }
  userDescription.appendChild(bioRow);

  if (followBtn) {
    userDescription.appendChild(followBtn);
  }

  return userDescription;
}
