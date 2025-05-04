// import { userMessage } from "/js/utils/messages/userMessage.js";
// import { createSingleCard } from "/js/app/routes/feed/cards/createSingleCard.js";
// import { posts } from "/js/utils/source/posts/posts.js";
// import { userLookup } from "/js/utils/source/users/users.js";

// export function submitPost() {
//   const form = document.getElementById("new-post-form");
//   const cardContainer = document.getElementById("card-container");

//   if (!form || !cardContainer) return;

//   form.removeEventListener("submit", submitHandler);
//   form.addEventListener("submit", submitHandler);
//   console.log("submitBtn clicked.");
// }

// function submitHandler(event) {
//   if (event) event.preventDefault();

//   const postImage = document.querySelector("img[alt='New post-image']");
//   const title = document.getElementById("title");
//   const caption = document.getElementById("caption");

//   if (!postImage.src || !caption.value.trim()) {
//     userMessage("warning", "Please upload an image and write a caption!");
//     return;
//   }

//   // Convert image to from blob to string
//   fetch(postImage.src)
//     .then((res) => res.blob())
//     .then((blob) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(blob);
//       reader.onloadend = () => {
//         const base64Image = reader.result;

//         const newPostCard = {
//           id: posts.length + 1,
//           title: title ? title.value.trim() : "New Post",
//           imgSrc: base64Image,
//           imgAlt: `Post image titled: ${
//             title ? title.value.trim() : "New Post"
//           }`,
//           caption: caption.value.trim(),
//           text: 0,
//           likes: 0,
//           username: userLookup[3].username || "Unknown user",
//           userId: 3,
//           createdAt: new Date(),
//           comments: [],
//         };
//         posts.unshift(newPostCard);
//         localStorage.setItem("posts", JSON.stringify(posts));

//         const cardContainer = document.getElementById("card-container");
//         if (!cardContainer) {
//           userMessage("error", "Couldn't create post.");
//           return;
//         }
//         const newPostCardCard = createSingleCard(newPostCard);
//         cardContainer.prepend(newPostCardCard);
//       };
//     })
//     .catch((error) => console.error("Error when converting image:", error));
// }
