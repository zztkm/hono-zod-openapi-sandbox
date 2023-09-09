import { createRoute } from '@hono/zod-openapi';
import {
    HealthCheckSchema,
    ParamsSchema,
    UserSchema,
    CreateUserSchema,
    ErrorSchema
} from './schemas';

export const healthCheck = createRoute({
    method: 'get',
    path: '/health-check',
    tags: ['health'],
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: HealthCheckSchema,
                },
            },
            description: 'health check',
        },
    },
});

export const getUserById = createRoute({
    method: 'get',
    path: '/users/{id}',
    tags: ['user'],
    security: [
        {
            bearerAuth: [],
        },
    ],
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
    tags: ['user'],
    security: [
        {
            bearerAuth: [],
        },
    ],
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
