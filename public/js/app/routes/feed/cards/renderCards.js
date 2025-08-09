export async function renderCards(posts, container) {
  // DEBUG
  console.log("renderCards posts:", posts);
  console.log("renderCards container exists?", !!container);

  if (!container) {
    console.error("container is undefined");
    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = `user-post max-w-sm w-80 bg-white border border-gray-200 rounded-md
    shadow-sm dark:bg-[#0f0c29] dark:border-none hover:scale-105 transition-transform duration-300`;
    card.setAttribute("data-id", post.id);
    card.setAttribute("data-id", post.id);
    card.dataset.created = post.created;
    card.dataset.likes =
      typeof post._count.reactions === "number" ? post._count.reactions : 0;
    card.dataset.comments = Array.isArray(post.comments)
      ? post._count.comments
      : 0;

    const image = document.createElement("img");
    image.className = `rounded-t-md w-full h-48 object-cover cursor-pointer`;
    image.src = post.media?.url || "/resources/icons/no-image-icon.webp";
    image.alt = post.media?.alt || "Default post image";

    const contentDiv = document.createElement("div");
    contentDiv.className = "p-5";

    const linkTitle = document.createElement("a");
    linkTitle.href = `/user/profile/?id=${post.author?.name || "unknown"}`;
    const authorName = document.createElement("h2");
    authorName.className = `mb-2 text-2xl font-bold tracking-tight text-accent-light
    dark:text-accent-dark hover:text-gray-900 hover:dark:text-gray-200`;
    authorName.textContent = post.author?.name || "Unknown author";
    linkTitle.appendChild(authorName);

    const title = document.createElement("h3");
    title.className =
      "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
    title.textContent = post.title;

    contentDiv.appendChild(linkTitle);
    contentDiv.appendChild(title);

    card.appendChild(image);
    card.appendChild(contentDiv);

    container.appendChild(card);
  });
}
