import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/features/dashboard/Dashboard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}
