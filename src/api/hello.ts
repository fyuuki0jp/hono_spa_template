import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

export const HelloSchema = createRoute({
	path: "/hello",
	method: "get",
	description: "定型分をレスポンスする",
	request: {},
	responses: {
		200: {
			description: "OK",
			content: {
				"application/json": {
					schema: z.object({
						message: z.string().openapi({
							example: "Hello World!",
							description: "応答",
						}),
					}),
				},
			},
		},
	},
});

const app = new OpenAPIHono();

const route = app.openapi(HelloSchema, (ctx) => {
	return ctx.json(
		{
			message: "Hello Hono!",
		},
		200,
	);
});

export default route;
