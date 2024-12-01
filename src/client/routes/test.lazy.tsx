import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/test')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <p>Hello "/test"!</p>
            <Link to="/">Test</Link>
        </div>
    )
}
