import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/post/post")({
  beforeLoad: ({ context }) => {
    // Add auth check if needed
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: Post,
});

function Post() {
  return <div className="p-2">Hello from Post!</div>;
}
