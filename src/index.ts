import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { route } from './routes'

const app = new OpenAPIHono()

app.use('/docs', cors())
app.openapi(
    route,
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
)

app.doc('/docs', {
    openapi: '3.0.0',
    info: {
        version: '0.1.0',
        title: 'kiboshin kigdom',
    }
})

export default app
