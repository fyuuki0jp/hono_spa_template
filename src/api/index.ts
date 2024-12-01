import { OpenAPIHono } from '@hono/zod-openapi';
import HelloAPI from './hello';

const app = new OpenAPIHono().basePath('/api');

const route = app.route('/', HelloAPI);

if (!import.meta.env.PROD) {
	app.doc('/specification', {
		openapi: '3.0.1',
		info: {
			title: 'API',
			version: '1.0.0',
		},
	});
	const { swaggerUI } = await import('@hono/swagger-ui');
	app.get(
		'/doc',
		swaggerUI({
			url: './specification',
		}),
	);
}

export type APISchema = typeof route;

export default app;
