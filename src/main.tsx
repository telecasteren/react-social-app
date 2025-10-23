import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider } from "@/context/auth/AuthProvider";
import * as AuthTypes from "@/utils/types/auth/types";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/index.css";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  } as AuthTypes.AuthContextType,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
