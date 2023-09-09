import { createRoute } from '@hono/zod-openapi';
import {
    HealthCheckSchema,
    ParamsSchema,
    UserSchema,
    CreateUserSchema,
    ErrorSchema,
    UserListSchema,
} from './schemas';

export const healthCheck = createRoute({
    method: 'get',
    description: 'health check',
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
    description: 'get user by id',
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

export const listUser = createRoute({
    method: 'get',
    description: 'list user',
    path: '/users',
    tags: ['user'],
    security: [
        {
            bearerAuth: [],
        },
    ],
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: UserListSchema,
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
    description: 'create user',
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
