import { useEffect, useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useScrollRestore } from "@/hooks/scroll/useScrollRestore";
import { loadKey } from "@/services/helpers/storage";
import { getSingleUserProfile } from "@/services/api/user/getSingleUserProfile";
import type { Profile } from "@/utils/types/user/profile";
import { POSTS_PER_PAGE } from "@/services/api/auth/config/constants";
import Posts from "@/features/post/Posts";
import { fetchAllPosts } from "@/services/api/posts/fetchAllPosts";
import SkeletonCard from "@/components/loaders/SkeletonCard";
import Title from "@/components/titles/Title";
import { useSearch } from "@/hooks/feed/useSearch";
import { FeedSearch } from "@/features/feed/FeedSearch";
import SortOptions from "@/components/search/SortOptions";

function Feed() {
  const isCurrentUser = Route.useLoaderData();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  // const [showNewPost, setShowNewPost] = useState(false);
  const searchHook = useSearch();
  const { results: searchResults, hasResults } = searchHook;
  const postsToRender = hasResults ? searchResults : posts;

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
    <div className="flex flex-col mt-10 items-center">
      <Title text="Feed me" className="text-bigger mb-10 text-center" />
      <FeedSearch searchHook={searchHook} />
      <SortOptions
        containerClasses="justify-center mb-10 mt-10"
        onSortByComments={() => console.log("Sort by comments")}
        onSortByCreated={() => console.log("Sort by created")}
        onSortByLikes={() => console.log("Sort by likes")}
      />
      <Posts posts={postsToRender} loading={loading} />
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
