import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthProvider } from "@/context/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => (
  <AuthProvider>
    <div className="min-h-screen">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            color: "#1e40af",
            backgroundColor: "#dbeafe",
            border: "1px solid #93c5fd",
          },
          success: {
            style: {
              color: "#166534",
              backgroundColor: "#f0fdf4",
              border: "1px solid #86efac",
            },
          },
          error: {
            style: {
              color: "#991b1b",
              backgroundColor: "#fef2f2",
              border: "1px solid #fca5a5",
            },
          },
        }}
      />
      <header>
        <Navbar />
      </header>
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </div>
  </AuthProvider>
);

export const Route = createRootRoute({
  component: RootLayout,
});
