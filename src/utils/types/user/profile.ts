export interface Profile {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url?: string;
    alt?: string;
  };
  banner?: {
    url?: string;
    alt?: string;
  };
  _count?: {
    posts?: number;
    followers?: number;
    following?: number;
  };
  _followers?: Array<{
    name: string;
    email: string;
    bio?: string;
    avatar?: { url?: string; alt?: string };
    banner?: { url?: string; alt?: string };
  }>;
  _following?: Array<{
    name: string;
    email: string;
    bio?: string;
    avatar?: { url?: string; alt?: string };
    banner?: { url?: string; alt?: string };
  }>;
  _posts?: Array<{
    id: 0;
    owner: string;
    title: string;
    body: string;
    tags: string[];
    media: {
      url: string;
      alt: string;
    };
    created: string;
    updated: string;
  }>;
}
