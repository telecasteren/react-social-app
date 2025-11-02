import { useEffect, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useScrollRestore } from "@/hooks/useScrollRestore";
import { loadKey } from "@/services/helpers/storage";
import { getSingleUserProfile } from "@/services/api/user/getSingleUserProfile";
import type { Profile } from "@/utils/types/user/profile";
import { POSTS_PER_PAGE } from "@/services/api/auth/config/constants";
import Posts from "@/features/post/Posts";
import { fetchAllPosts } from "@/services/api/posts/fetchAllPosts";
import SkeletonCard from "@/components/loaders/SkeletonCard";

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
        setPosts(postsData.data);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <SkeletonCard count={6} />;
  }

  return (
    <div className="flex flex-col gap-20 mt-10 items-center">
      <h2 className="text-bigger m-4 text-center">Feed me</h2>
      <div className="justify-self-center">Search input will be put here</div>
      <Posts posts={posts} loading={loading} />
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
