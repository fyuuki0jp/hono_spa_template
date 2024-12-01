import type { APISchema } from "@/api/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, createLazyRoute } from "@tanstack/react-router";
import { hc } from "hono/client";

const client = hc<APISchema>("/api");

const Component = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["todos"],
		queryFn: async (param) => {
			const res = await client.hello.$get();
			return await res.json();
		},
	});

	return (
		<>
			<h1>Hello, TanStack Router</h1>
			{!isLoading && <p>{data?.message}</p>}
			<Link to="/test">Test</Link>
		</>
	);
};

export const Route = createLazyRoute("/")({
	component: Component,
});
