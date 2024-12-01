import { RouterProvider, createRouter, type Register } from '@tanstack/react-router';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen';

import './global.css';

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface AppRouter extends Register {
		router: typeof router;
	}
}

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
