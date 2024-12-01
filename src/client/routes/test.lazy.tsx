import { Link, createLazyRoute } from "@tanstack/react-router";

function RouteComponent() {
	return (
		<div>
			<p>Hello "/test"!</p>
			<Link to="/">Test</Link>
		</div>
	);
}

export const Route = createLazyRoute("/test")({
	component: RouteComponent,
});
