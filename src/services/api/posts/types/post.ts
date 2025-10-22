import type { Profile } from "@/services/api/user/types/profile";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: Array<string>;
  media: {
    url: string;
    alt: string;
  };
  created: string;
  updated: string;
  _count: {
    comments: number;
    reactions: number;
  };
  author?: Profile;
  comments?: Array<Comment>;
  reactions?: Array<Reaction>;
}

export interface Comment {
  id: number;
  postId: number;
  body: string;
  created: string;
  owner: string;
  author?: Profile;
  replyToId?: null | number;
}

export interface Reaction {
  symbol: string;
  count: number;
  reactors: string[];
}
