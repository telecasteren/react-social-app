import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthProvider } from "@/context/auth/AuthProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const RootLayout = () => (
  <AuthProvider>
    <div className="min-h-screen">
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
