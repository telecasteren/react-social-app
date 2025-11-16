import type { Profile } from "@/utils/types/user/profile";
import type { Reaction } from "@/utils/types/post/reaction";

export interface Post {
  id: number;
  title: string;
  body: string;
  tags: Array<string>;
  media?: {
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
