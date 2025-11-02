import { createFileRoute, redirect } from "@tanstack/react-router";
import { usePageMeta } from "@/hooks/meta/usePageMeta";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchSinglePost } from "@/services/api/posts/fetchSinglePost";
import { POST_DESC_FALLBACK } from "@/utils/branding/config";

export const Route = createFileRoute("/post/$id")({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: Post,
});

function Post() {
  const { postId } = useParams();
  const { data: post } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchSinglePost(postId),
  });

  usePageMeta(
    post?.title || `Post id: ${post?.id}`,
    post?.description || POST_DESC_FALLBACK,
  );

  return <div className="p-2">Hello from Post!</div>;
}
