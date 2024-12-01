import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import React from "react";

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null // Render nothing in production
		: React.lazy(() =>
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);

const queryClient = new QueryClient();

export const Route = createRootRoute({
	component: () => (
		<QueryClientProvider client={queryClient}>
			<Outlet />
			<TanStackRouterDevtools />
		</QueryClientProvider>
	),
});
