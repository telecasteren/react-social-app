import { useEffect, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import { loadKey } from "@/services/helpers/storage";
import { getSingleUserProfile } from "@/services/api/user/getSingleUserProfile";
import type { Profile } from "@/utils/types/user/profile";
import { POSTS_PER_PAGE } from "@/services/api/auth/config/constants";
import Posts from "@/features/user/components/posts/Posts";
import { fetchAllPosts } from "@/services/api/posts/fetchAllPosts";

function Feed() {
  const isCurrentUser = Route.useLoaderData();
  const [posts, setPosts] = useState([]);
  // const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);

  useScrollRestore(`/user/feed/explore`);

  if (isCurrentUser) {
    // Load user-specific feed feature
  }

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const postsData = await fetchAllPosts(POSTS_PER_PAGE, 1);
        setPosts(postsData);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      <Posts posts={posts} loading={loading} />
      <div className="p-2">Hello from Feed!</div>
      {/* {showNewPost && setShowNewPost(isCurrentUser)} */}
    </div>
  );
}

export const Route = createFileRoute("/user/feed/explore")({
  loader: async () => {
    const currentUser = loadKey("profile") as Profile;
    const profile = await getSingleUserProfile(currentUser.name);
    const isCurrentUser = profile?.name === currentUser?.name;

    if (!isCurrentUser) {
      throw redirect({ to: "/" });
    }

    return { isCurrentUser };
  },
  component: Feed,
});
