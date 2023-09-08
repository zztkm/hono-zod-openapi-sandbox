import { createRoute } from '@hono/zod-openapi';
import { ParamsSchema, UserSchema, ErrorSchema } from './schemas';

export const route = createRoute({
    method: 'get',
    path: '/users/{id}',
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: UserSchema,
                },
            },
            description: 'retrieve user',
        },
        400: {
            content: {
                'application/json': {
                    schema: ErrorSchema,
                },
            },
            description: 'returns an error',
        },
    },
});