import { z } from '@hono/zod-openapi'

export const HealthCheckSchema = z.object({
    status: z.string().openapi({
        example: 'ok',
    }),
}).openapi('HealthCheck')


export const ParamsSchema = z.object({
    id: z
        .string()
        .min(3)
        .max(10)
        .openapi({
            param: {
                name: 'id',
                in: 'path',
            },
            example: '123',
        }),
})

export const UserSchema = z
    .object({
        id: z.string().openapi({
            example: '123'
        }),
        name: z.string().openapi({
            example: 'zztkm'
        }),
        age: z.number().openapi({
            example: 25
        }),
    })
    .openapi('User')

export const UserListSchema = z
    .array(UserSchema)
    .openapi('UserListSchema')

export const CreateUserSchema = z
    .object({
        name: z.string().openapi({
            example: 'zztkm'
        }),
        age: z.number().openapi({
            example: 25
        }),
    }).openapi('CreateUser')

export const ErrorSchema = z
    .object({
        code: z.number().openapi({
            example: 400,
        }),
        message: z.string().openapi({
            example: 'bad request',
        }),
    })
