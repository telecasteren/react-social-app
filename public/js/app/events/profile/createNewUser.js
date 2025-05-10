export function createNewUser({ id, email, password }) {
  return {
    id,
    username: email.split("@")[0],
    name: "",
    email,
    password,
    active: true,
    description: "",
    avatarSrc: "/resources/images/avatars/default.webp",
    avatarAlt: "default user",
    followers: "0",
    following: "0",
    posts: {
      numberOf: "0",
    },
  };
}
