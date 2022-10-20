import { rest } from 'msw'
import { range } from 'ramda'

export const handlers = [
    rest.get('/api/posts', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                success: true,
                data: range(0, 10).map(x => ({
                    id: x.toString(),
                    text: `hello, this is post ${x}`,
                    status: 0,
                })),
                message: 'success',
            })
        )
    }),
    rest.get('/api/post/:postId', (req, res, ctx) => {
        const { postId } = req.params

        return res(
            ctx.status(200),
            ctx.json({
                success: true,
                data: {
                    id: postId,
                    text: `hello, this is post ${postId}`,
                    status: 0,
                },
            })
        )
    }),
]
