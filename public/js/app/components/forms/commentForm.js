import { getCurrentUser } from "/js/utils/source/helpers/getCurrentUser.js";
import { submitCommentHandler } from "/js/app/events/userActions/commenting/submitCommentHandler.js";
import {
  userMessage,
  clearUserMessage,
} from "/js/utils/messages/userMessage.js";

function toggleCommentBtn() {
  const commentBtn = document.getElementById("toggle-comment-form-btn");
  if (commentBtn) {
    commentBtn.classList.remove("hidden");
  }
}

export async function commentForm() {
  const currentUser = await getCurrentUser();

  const commentForm = document.createElement("div");
  commentForm.id = "comment-form";
  commentForm.className = "hidden";

  const header = document.createElement("div");
  header.className = "flex items-center space-x-2 rtl:space-x-reverse";

  const img = document.createElement("img");
  img.className =
    "w-8 h-8 rounded-full object-cover border border-accent-light dark:border-accent-dark";
  img.src = currentUser.avatar.url || "/resources/icons/no-avatar-img.jpg";
  img.alt = currentUser.avatar.alt || "No profile image found.";

  const commentContainer = document.createElement("div");
  commentContainer.id = "comment-form-container";
  commentContainer.className = "commentForm w-full flex flex-col gap-4";

  const authorName = document.createElement("span");
  authorName.setAttribute("required", "");
  authorName.id = "author-name";
  authorName.className = "text-sm font-semibold text-gray-900 dark:text-white";
  authorName.textContent = currentUser.name;

  const commentTextarea = document.createElement("textarea");
  commentTextarea.rows = 3;
  commentTextarea.id = "comment-message";
  commentTextarea.className = `w-full p-2 border border-accent-light dark:border-accent-dark
  rounded-md dark:bg-[#302b63] text-black dark:text-white hover:scale-[1.01] transition duration-300`;

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "flex justify-start mb-6";

  const submitCommentBtn = document.createElement("button");
  submitCommentBtn.type = "submit";
  submitCommentBtn.id = "submit-comment";
  submitCommentBtn.className =
    "mt-2 px-4 py-2 w-fit text-black bg-accent-light dark:bg-accent-dark rounded-md hover:brightness-110 cursor-pointer";
  submitCommentBtn.textContent = "Submit";

  submitCommentBtn.addEventListener("click", (event) => {
    userMessage("info", "Sending comment...");

    event.preventDefault();
    submitCommentHandler();

    setTimeout(() => clearUserMessage(), 500);
    commentForm.classList.toggle("hidden");
    toggleCommentBtn();
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "ml-4 mt-2 text-sm text-gray-400 hover:text-red-800";
  cancelBtn.textContent = "Cancel";

  cancelBtn.addEventListener("click", () => {
    toggleCommentBtn();
    commentForm.classList.add("hidden");
  });

  header.appendChild(img);
  header.appendChild(authorName);
  commentContainer.appendChild(header);
  commentContainer.appendChild(commentTextarea);
  buttonDiv.appendChild(submitCommentBtn);
  buttonDiv.appendChild(cancelBtn);
  commentContainer.appendChild(buttonDiv);

  commentForm.appendChild(commentContainer);

  return commentForm;
}
