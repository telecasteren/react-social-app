export const returnProfileList = (users) => {
  const wrapper = document.createElement("div");

  console.log("returnProfileList(users): ", users); // ===== DEBUGGING

  const listUl = document.createElement("ul");
  listUl.className = "flex flex-row justify-self-center justify-center gap-4";

  users.forEach((user) => {
    const username = user.name;
    console.log("Username: ", username); // ===== DEBUGGING

    const link = document.createElement("a");
    link.href = `/user/profile/?id=${username}`;
    const listLi = document.createElement("li");
    listLi.className =
      "text-md underline hover:underline-none hover:text-[var(--accent)]";
    listLi.setAttribute("data-username", username);
    listLi.innerText = username;

    link.appendChild(listLi);
    listUl.appendChild(link);
  });

  wrapper.appendChild(listUl);
  return wrapper;
};
