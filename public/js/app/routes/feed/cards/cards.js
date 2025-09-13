import { getPosts } from "/js/utils/source/api/posts/get/getPosts.js";
import { renderCards } from "/js/app/routes/feed/cards/renderCards.js";
import { POSTS_PER_PAGE } from "/js/utils/source/api/general/constants.js";

export const createCards = async () => {
  const { data: posts } = await getPosts(POSTS_PER_PAGE, 1);

  const cardContainer = document.createElement("div");
  cardContainer.id = "posts-container";
  cardContainer.className =
    "card-container flex flex-column flex-wrap gap-4 sm:gap-6 lg:gap-12 justify-center ml-20 mr-20";

  await renderCards(posts, cardContainer);
  return cardContainer;
};
