export const createSingleCard = (post) => {
  const postImgSrc = post.imgSrc || NO_IMG_URL;
  const postImgAlt = post.imgAlt || "Default post image";
  const userName = post.username || "Unknown User";
  const postTitle =
    post.title.length > 20 ? post.title.slice(0, 20) + "..." : post.title;

  const card = document.createElement("div");
  card.setAttribute("data-id", post.id);
  card.className = `user-post max-w-sm w-80 bg-white border border-gray-200 rounded-md
    shadow-sm dark:bg-[#0f0c29] dark:border-none hover:scale-105 transition-transform duration-300`;

  const image = document.createElement("img");
  image.className = "rounded-t-md w-full h-48 object-cover";
  image.src = postImgSrc;
  image.alt = postImgAlt;

  const contentDiv = document.createElement("div");
  contentDiv.className = "p-5";

  const linkTitle = document.createElement("a");
  linkTitle.href = "/user/profile/";
  const authorName = document.createElement("h2");
  authorName.className =
    "mb-2 text-2xl font-bold tracking-tight text-accent-light dark:text-accent-dark hover:text-gray-900 hover:dark:text-gray-200";
  authorName.textContent = userName;
  linkTitle.appendChild(authorName);

  const title = document.createElement("h3");
  title.className =
    "mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white";
  title.textContent = postTitle;

  const paragraph = document.createElement("p");
  paragraph.className = "mb-3 font-normal text-gray-700 dark:text-gray-400";
  paragraph.textContent = post.caption;

  contentDiv.appendChild(linkTitle);
  contentDiv.appendChild(title);
  contentDiv.appendChild(paragraph);

  card.appendChild(image);
  card.appendChild(contentDiv);

  return card;
};
