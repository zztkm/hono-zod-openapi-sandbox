import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import {
    healthCheck,
    getUserById,
    createUser,
    updateUser,
    listUser,
} from './routes'

const app = new OpenAPIHono()
const registry = app.openAPIRegistry

registry.registerComponent(
    'securitySchemes',
    'bearerAuth', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token',
    },
)

app.use('/docs', cors())
app.openapi(
    healthCheck,
    (c) => {
        return c.jsonT({
            status: 'ok',
        })
    },
);

app.openapi(
    getUserById,
    (c) => {
        const { id } = c.req.valid('param')
        return c.jsonT({
            id,
            age: 25,
            name: 'zztkm',
        })
    },
    // hook
    (result, c) => {
        if (!result.success) {
            return c.jsonT({
                code: 400,
                message: 'validation error',
            }, 400)
        }
    }
);

app.openapi(
    listUser,
    (c) => {
        return c.jsonT([{
            id: '123',
            name: 'zztkm',
            age: 25,
        }])
    },
    (result, c) => {
        if (!result.success) {
            return c.jsonT({
                code: 400,
                message: 'validation error',
            }, 400)
        }
    }
);

app.openapi(
    createUser,
    (c) => {
        const { name, age } = c.req.valid('json')
        return c.jsonT({
            id: '123',
            name,
            age,
        })
    },
    (result, c) => {
        if (!result.success) {
            return c.jsonT({
                code: 400,
                message: 'validation error',
            }, 400)
        }
    }
);

app.openapi(
    updateUser,
    (c) => {
        const { id } = c.req.valid('param')
        const { name, age } = c.req.valid('json')
        return c.jsonT({
            id,
            name: name ? name : 'test',
            age: age ? age : 0,
        })
    },
    (result, c) => {
        if (!result.success) {
            return c.jsonT({
                code: 400,
                message: 'validation error',
            }, 400)
        }
    }
);

app.doc('/docs', {
    openapi: '3.0.0',
    info: {
        version: '0.1.0',
        title: 'kiboshin kigdom',
    },
})

export default app
