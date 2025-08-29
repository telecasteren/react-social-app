import createButton from "/js/app/components/buttons/primaryBtn.js";

export function createFollowButton() {
  const followBtn = createButton({
    text: "Follow",
    href: "#",
    newTab: false,
  });
  followBtn.classList.add("follow-btn", "btn-secondary", "justify-self-center");
  return followBtn;
}
