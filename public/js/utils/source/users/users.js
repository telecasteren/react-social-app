const users = [
  {
    id: 1,
    username: "JimmyCraig",
    name: "Jimmy John Craig",
    email: "test@noroff.no",
    password: "123456789",
    active: false,
    description: "Born in Rome, travelling for food.",
    avatarSrc: "/resources/images/avatars/rayul-_M6gy9oHgII-unsplash.webp",
    avatarAlt: "rayul-_M6gy9oHgII-unsplash",
    followers: "201",
    following: "34",
    posts: {
      numberOf: "29",
    },
  },
  {
    id: 2,
    username: "JaneDoe95",
    name: "Jane Doe",
    email: "janey@stud.noroff.no",
    password: "janeygirl",
    active: false,
    description: "Fruitarian conquering the world!",
    avatarSrc:
      "/resources/images/avatars/ayo-ogunseinde-6W4F62sN_yI-unsplash.webp",
    avatarAlt: "ayo-ogunseinde-6W4F62sN_yI-unsplash",
    followers: "44",
    following: "213K",
    posts: {
      numberOf: "3",
    },
  },
  {
    id: 3,
    username: "ChrisGoesWhereFoodIs",
    name: "Chris Isaak Johnson",
    email: "nilsen.tele@noroff.no",
    password: "foodieman",
    active: false,
    description: "x-rated food enthusiast.",
    avatarSrc: "/resources/images/avatars/ian-dooley-d1UPkiFd04A-unsplash.webp",
    avatarAlt: "ian-dooley-d1UPkiFd04A-unsplash",
    followers: "80",
    following: "78",
    posts: {
      numberOf: "201",
    },
  },
  {
    id: 4,
    username: "BakingWithEmily",
    name: "Emily Suarez",
    email: "test@stud.noroff.no",
    password: "testuser",
    active: false,
    description: "A sweet treats girl from all over the world!",
    avatarSrc:
      "/resources/images/avatars/toa-heftiba-O3ymvT7Wf9U-unsplash.webp",
    avatarAlt: "toa-heftiba-O3ymvT7Wf9U-unsplash",
    followers: "340K",
    following: "1439",
    posts: {
      numberOf: "168",
    },
  },
  {
    id: 5,
    username: "Fusion_John",
    name: "Johnas Casterion",
    email: "john@casterion.no",
    password: "",
    active: false,
    description: "Colorful boy from South of the Equator.",
    avatarSrc:
      "/resources/images/avatars/ivana-cajina-_7LbC5J-jw4-unsplash.webp",
    avatarAlt: "ivana-cajina-_7LbC5J-jw4-unsplash",
    followers: "1.2M",
    following: "22",
    posts: {
      numberOf: "492",
    },
  },
  {
    id: 6,
    username: "Lazy_with_Liona",
    name: "Liona Haze Jansen",
    email: "lioness@email.com",
    password: "",
    active: false,
    description: "Just ease into it and keep eating!",
    avatarSrc:
      "/resources/images/avatars/rafaella-mendes-diniz-et_78QkMMQs-unsplash.webp",
    avatarAlt: "rafaella-mendes-diniz-et_78QkMMQs-unsplash",
    followers: "24",
    following: "51",
    posts: {
      numberOf: "1207",
    },
  },
];

export const userLookup = Object.fromEntries(
  users.map((user) => [user.id, user])
);
