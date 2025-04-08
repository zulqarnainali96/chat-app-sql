import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const user = localStorage.getItem("user");

    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    // If user is not authenticated and trying to access protected route
    if (!user && !isPublicRoute) {
      throw redirect({
        to: "/login",
      });
    }

    // If user is authenticated and trying to access login/register
    if (user && isPublicRoute) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },

  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
