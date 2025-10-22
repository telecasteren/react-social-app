import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/user/feed/")({
  beforeLoad: ({ context }) => {
    // Add auth check if needed
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: Feed,
});

function Feed() {
  return <div className="p-2">Hello from Feed!</div>;
}
