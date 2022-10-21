import { api } from 'utils/api'

type PostRes = {
    id: number
    attributes: {
        title: string
        content: string
    }
}

export type Post = {
    title: string
    content: string
}

type PostService = {
    page: (params: {
        page: number
        pageSize: number
    }) => Promise<PageRes<PostRes>>
    getById: (id: string) => Promise<CommonRes<PostRes>>
    create: (payload: Post) => Promise<void>
    /**
     * 删除post
     */
    delete: (id: number) => Promise<void>
    update: (payload: { id: number; data: Post }) => Promise<void>
}

export const postService: PostService = {
    page: params =>
        api.get('/posts', {
            params: {
                pagination: params,
            },
        }),
    getById: id => api.get(`/posts/${id}`),
    create: payload => api.post('/posts', { data: payload }),
    delete: id => api.delete(`/posts/${id}`),
    update: ({ id, data }) => api.put(`/posts/${id}`, { data }),
}
