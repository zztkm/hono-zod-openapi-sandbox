import { createRoute } from '@hono/zod-openapi';
import {
    ParamsSchema,
    UserSchema,
    CreateUserSchema,
    ErrorSchema
} from './schemas';

export const getUserById = createRoute({
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

export const createUser = createRoute({
    method: 'post',
    path: '/users',
    request: {
        body: {
            content: {
                'application/json': {
                    schema: CreateUserSchema,
                },
            },
        }
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
