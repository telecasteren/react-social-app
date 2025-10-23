import { Link } from "@tanstack/react-router";
import type { Post } from "@/utils/types/post/post";
const NO_IMG_URL = "@/utils/branding/config";

interface PostsProps {
  posts: Post[];
  loading?: boolean;
}

const PostItem = ({ post }: { post: Post }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.src = NO_IMG_URL;
    img.alt = "Image not available";
  };

  const postImgSrc = post.media?.url || NO_IMG_URL;
  const postImgAlt = post.media?.alt || "Default post image";
  const title = post.title || "No title";
  const reactionsCount = post._count?.reactions || 0;
  const commentsCount = post._count?.comments || 0;

  return (
    <Link
      to="/post/$id"
      params={{ id: post.id.toString() }}
      className="block"
      aria-label={`View post:${title}`}
    >
      <div
        className="user-post relative w-full h-48 flex justify-center items-center cursor-pointer"
        data-id={post.id}
        data-created={post.created}
        data-title={title}
        data-likes={reactionsCount}
        data-comments={commentsCount}
      >
        <img
          src={postImgSrc}
          alt={postImgAlt}
          className="w-full h-full object-cover rounded-sm border border-gray-300 dark:border-0 hover:scale-105 md:hover:bg-black md:hover:opacity-50 transition-transform duration-300"
          onError={handleImageError}
        />

        <div className="absolute justify-center flex flex-wrap gap-2 bg-white text-black rounded-md p-1">
          <div>♥️ {reactionsCount} Likes</div>
          <div>💬 {commentsCount} Comments</div>
        </div>
      </div>
    </Link>
  );
};

const Posts = ({ posts, loading }: PostsProps) => {
  if (loading) {
    return <div>Loading posts...</div>; // === Replace with skeleton
  }

  if (posts.length === 0) {
    return (
      <div className="p-4 w-fit text-center text-sm rounded-sm shadow-xl border border-accent-light dark:border-accent-dark">
        No posts yet
      </div>
    );
  }

  return (
    <div
      id="posts-container"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
    >
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
