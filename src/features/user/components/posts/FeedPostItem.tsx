import { NO_IMG_URL } from "@/utils/branding/config";
import type { Post } from "@/utils/types/post/post";
import { Link } from "@tanstack/react-router";

interface FeedPostItemProps {
  post: Post;
}

const FeedPostItem: React.FC<FeedPostItemProps> = ({ post }) => {
  const { media, author, title, body, id } = post;

  const postImgSrc = media.url || NO_IMG_URL;
  const postImgAlt = media.alt || "Default post image";
  const userName = author?.name || "Unknown author";
  const postTitle = title || "Untitled post";
  const postBody = body || "";
  const postId = id;

  return (
    <Link to="/post/$id" params={{ id: postId.toString() }}>
      <div
        data-id={postId}
        className="user-post max-w-sm w-80 bg-white border border-gray-200 rounded-md
        shadow-sm dark:bg-[#0f0c29] dark:border-none hover:scale-105 transition-transform duration-300"
      >
        <img
          className="rounded-t-md w-full h-48 object-cover"
          src={postImgSrc}
          alt={postImgAlt}
        />
        <div className="p-5">
          <a href="/user/profile/">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-accent-light dark:text-accent-dark hover:text-gray-900 hover:dark:text-gray-200">
              {userName}
            </h2>
          </a>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {postTitle}
          </h3>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {postBody}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default FeedPostItem;
