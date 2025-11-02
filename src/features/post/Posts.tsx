import type { Post } from "@/utils/types/post/post";
import ProfilePostItem from "./components/ProfilePostItem";
import FeedPostItem from "./components/FeedPostItem";
import { useRouter } from "@tanstack/react-router";

interface PostsProps {
  posts: Post[];
  loading?: boolean;
  page?: "profile" | "feed";
}

const Posts = ({ posts, loading, page }: PostsProps) => {
  const router = useRouter();

  const pageType =
    page ||
    (router.state.location.pathname.includes("/profile/") ? "profile" : "feed");

  if (loading) {
    return <div>Loading posts...</div>; // === Replace with skeleton
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="p-4 w-fit text-center text-sm rounded-sm shadow-xl border border-accent-light dark:border-accent-dark">
        No posts yet
      </div>
    );
  }

  const PostComponent = pageType === "profile" ? ProfilePostItem : FeedPostItem;
  const postContainerClass =
    pageType === "profile" ? "profile-post" : "feed-post";

  return (
    <div id="posts-container" className={postContainerClass}>
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  );
};
export default Posts;
