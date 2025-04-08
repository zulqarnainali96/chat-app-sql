import { createFileRoute, redirect } from "@tanstack/react-router";
import Dashboard from "../Pages/Dashboard/dashboard";
import Loader from "../Components/Loader";

export const Route = createFileRoute("/dashboard")({
  pendingComponent: () => <Loader xxl={true} />,

  beforeLoad: async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: () => <Dashboard />,
});
