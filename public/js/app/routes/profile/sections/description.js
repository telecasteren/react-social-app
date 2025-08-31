import { toggleFollowing } from "/js/app/events/userActions/following/follows.js";
import { loadKey } from "/js/utils/storage/loadKey.js";
import { editDescription } from "/js/app/components/forms/bioForm.js";
import { createEditIcon } from "/js/app/components/buttons/editIconBtn.js";

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

  if (currentUser.name === user.name) {
    const editBioIcon = createEditIcon({
      label: "Edit",
      classes: `
    edit-post pl-2 pr-2 w-10 hover:w-24 h-10
    bg-gray-800 dark:bg-[#181438e3] hover:bg-gray-600 hover:dark:bg-[#534ba5e3]
    rounded shadow-md cursor-pointer flex items-center justify-start
    overflow-hidden transition-all duration-300 group
    `,
    });
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
