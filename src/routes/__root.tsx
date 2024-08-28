import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import QueryProvider from "../providers/QueryProvider";

export const Route = createRootRoute({
  component: () => (
    <>
      <QueryProvider>
        <Outlet />
      </QueryProvider>
      <TanStackRouterDevtools />
    </>
  ),
});
