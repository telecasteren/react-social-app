import type { Profile } from "@/utils/types/user/profile";

export interface Comment {
  id: number;
  postId: number;
  body: string;
  created: string;
  owner: string;
  author?: Profile;
  replyToId?: null | number;
}
