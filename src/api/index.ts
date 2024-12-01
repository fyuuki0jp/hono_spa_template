import { OpenAPIHono } from '@hono/zod-openapi';
import { Hono } from 'hono';
import HelloAPI from './hello';

const app = new OpenAPIHono();

const route = app.route('/', HelloAPI);

if (!import.meta.env.PROD) {
	app.doc('/specification', {
		openapi: '3.1.0',
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
