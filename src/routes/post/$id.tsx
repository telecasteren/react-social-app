import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { usePageMeta } from "@/hooks/meta/usePageMeta";
import { useQuery } from "@tanstack/react-query";
import { fetchSinglePost } from "@/services/api/posts/fetchSinglePost";
import { POST_DESC_FALLBACK, NO_IMG_URL } from "@/utils/branding/config";
import Spinner from "@/components/loaders/Spinner";
import DateBadge from "@/components/badge/DateBadge";

function Post() {
  const { postId } = Route.useLoaderData();
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchSinglePost(postId),
  });

  usePageMeta(
    post?.title || `Post id: ${post?.id}`,
    post?.description || POST_DESC_FALLBACK,
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !post) {
    return (
      <div className="p-4 text-center text-red-600">Failed to load post</div>
    );
  }

  const author = post.author?.name || "Unknown author";
  const postImgUrl = post.media?.url || NO_IMG_URL;
  const postImgAlt = post.media?.alt || "Default post image";

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[2fr,1.5fr] justify-self-center mt-5 max-w-[95vw] md:max-w-[60vw]">
        <div className="relative flex flex-col bg-stone-50 border border-gray-200 rounded-l-sm shadow-sm dark:bg-[#0f0c29] dark:border-none">
          <img
            className="rounded-l-sm w-full h-[500px] object-cover"
            src={postImgUrl}
            alt={postImgAlt}
          />

          <div className="p-5 flex-1 overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <img
                  data-userid={author}
                  className="w-8 h-8 object-cover rounded-full border border-accent-light dark:border-accent-dark"
                  src={post.author?.avatar?.url}
                  alt={post.author?.avatar?.alt}
                />
                <Link
                  to="/user/profile/$username"
                  params={{ username: post.author?.name || "unknown" }}
                >
                  <h5
                    data-userid={author}
                    className="text-2xl tracking-tight text-gray-900 dark:text-gray-200 hover:text-accent-light hover:dark:text-accent-dark flex-grow"
                  >
                    {author}
                  </h5>
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 items-center justify-end">
                <div id="likes-icon">
                  <i
                    className="fa-regular fa-heart cursor-pointer"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <div id="numb-likes">{post._count?.reactions || 0}</div>
              </div>
            </div>

            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {post.body}
            </p>

            {post.created && (
              <DateBadge
                createdAt={post.created}
                bgColor="gray-100"
                textColor="gray-100"
                borderColor="gray-300"
              />
            )}
          </div>

          {/* Edit button - show only if current user is author */}
          <div
            data-id={post.id}
            className="edit-post absolute top-2 right-2 pl-2 pr-2 w-10 hover:w-24 h-10 bg-gray-200 hover:bg-gray-400 text-black rounded shadow-md cursor-pointer flex items-center justify-start overflow-hidden transition-all duration-300 group"
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

        <div
          id="comments-section"
          className="flex flex-col xl:w-96 rounded-r-sm border border-solid border-gray-200 dark:border-[#0f0c29] p-0"
        >
          <div className="sm:max-h-[40vh] sm:min-h-[20vh] xl:max-h-[80vh] xl:min-h-[80vh] p-5 overflow-y-auto">
            {/* Comments component will go here */}
            <div>Comments section</div>
          </div>

          <div className="relative bottom-0 p-5 m-0 bg-stone-50 dark:bg-[#0f0c29]">
            {/* Comment form will go here */}
            <div>Comment form</div>
            <button className="mt-2">Toggle Comment Form</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const Route = createFileRoute("/post/$id")({
  loader: ({ params }) => {
    const postId = params.id;

    if (!postId) {
      throw redirect({ to: "/" });
    }

    return { postId };
  },
  component: Post,
});
