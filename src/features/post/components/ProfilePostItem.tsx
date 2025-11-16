import { Link } from "@tanstack/react-router";
import type { Post } from "@/utils/types/post/post";
const NO_IMG_URL = "@/utils/branding/config";
import { useHandleEditPost } from "@/hooks/post/useHandleEditPost";

const ProfilePostItem = ({ post }: { post: Post }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.src = NO_IMG_URL;
    img.alt = "Image not available";
  };

  const { media, title, _count } = post;

  const postImgSrc = media?.url || NO_IMG_URL;
  const postImgAlt = media?.alt || "Default post image";
  const reactionsCount = _count?.reactions || 0;
  const commentsCount = _count?.comments || 0;

  return (
    <div className="relative">
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

      <div
        data-id={post.id}
        onClick={useHandleEditPost}
        className="edit-post absolute top-2 right-2 pl-2 pr-2 w-10 hover:w-24 h-10 bg-gray-200 hover:bg-gray-400 dark:hover:bg-bg-dark3 dark:hover:text-white text-black rounded shadow-md cursor-pointer flex items-center justify-start overflow-hidden transition-all duration-300 group"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.862 3.487a2.125 2.125 0 0 1 3.001 3.001l-1.127 1.127-3.001-3.001 1.127-1.127zM14.993 5.356l3.001 3.001L7.5 18.85H4.5v-3L14.993 5.356z" />
          </svg>
        </div>
        <div className="ml-2 whitespace-nowrap opacity-0 transition-opacity duration-300 text-[0.8rem] group-hover:opacity-100">
          Edit
        </div>
      </div>
    </div>
  );
};
export default ProfilePostItem;
