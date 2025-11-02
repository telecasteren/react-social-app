import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/features/dashboard/Dashboard";
import { usePageMeta } from "@/hooks/meta/usePageMeta";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  usePageMeta(
    "Dashboard",
    "Login or create you account to connect with fellow Foodies.",
  );
  return (
    <div>
      <Dashboard />
    </div>
  );
}
