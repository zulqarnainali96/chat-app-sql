import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(user);
    if (user !== null) {
      throw redirect({ to: "/dashboard" });
    } else {
      throw redirect({ to: "/login" });
    }
  },
});




// import { createLazyRoute, createRoute, redirect, useNavigate } from "@tanstack/react-router";
// import Register from "../Pages/Auth/Register/register";
// import Login from "../Pages/Auth/Login/login";
// import { rootRoute } from "./__root";
// import Dashboard from "../Pages/Dashboard/dashboard";


// export const indexRoute = createLazyRoute({
//   path: "/",
//   beforeLoad: async () => {
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");
//     console.log(token);
//     if (token) {
//       throw redirect({ to: "/dashboard", replace: true });
//     } else {
//       throw navigate({ to: "/login" });
//     }
//   },
//   getParentRoute: () => rootRoute,
// });
// const registerRoute = createLazyRoute({
//   getParentRoute: () => rootRoute,
//   path: "/register",
//   component: () => <Register />,
// });

// const loginRoute = createLazyRoute({
//   getParentRoute: () => rootRoute,
//   path: "/login",
//   component: () => <Login />,
// });

// const dashboardRoute = createLazyRoute({
//   getParentRoute: () => rootRoute,
//   path: "/dashboard",
//   component: () => <Dashboard />,
// });

// export const routeTree = rootRoute.addChildren([
//   indexRoute,
//   registerRoute,
//   loginRoute,
//   dashboardRoute,
// ]);