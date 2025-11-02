import { NO_IMG_URL } from "@/utils/branding/config";
import type { Post } from "@/utils/types/post/post";
import { Link } from "@tanstack/react-router";

interface FeedPostItemProps {
  post: Post;
}

const FeedPostItem: React.FC<FeedPostItemProps> = ({ post }) => {
  const { media, author, title, id } = post;

  const postImgSrc = media?.url || NO_IMG_URL;
  const postImgAlt = media?.alt || "Default post image";
  const userName = author?.name || "Unknown author";
  const postTitle = title || "Untitled post";
  const postId = id;

  return (
    <div
      data-id={postId}
      className="user-post max-w-sm w-80 bg-white border border-gray-200 rounded-md
        shadow-sm dark:bg-[#0f0c29] dark:border-none hover:scale-105 transition-transform duration-300"
    >
      <Link to="/post/$id" params={{ id: postId.toString() }}>
        <img
          className="rounded-t-md w-full h-48 object-cover"
          src={postImgSrc}
          alt={postImgAlt}
        />
      </Link>
      <div className="p-5">
        <Link
          to="/user/profile/$username"
          params={{ username: author?.name || "unknown" }}
        >
          <h2 className="mb-2 text-sm font-bold tracking-tight text-accent-light dark:text-accent-dark hover:text-gray-900 hover:dark:text-gray-200">
            {userName}
          </h2>
        </Link>
        <h3 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
          {postTitle}
        </h3>
      </div>
    </div>
  );
};
export default FeedPostItem;
