import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/user/profile")({
  beforeLoad: ({ context }) => {
    // Add auth check if needed
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: Profile,
});

function Profile() {
  return <div className="p-2">Profile Page</div>;
}
