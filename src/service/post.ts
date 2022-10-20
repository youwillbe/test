import { api } from 'utils/api'

type Post = {
    id: string
    text: string
    status: 0 | 1
}

type PostService = {
    list: () => Promise<Post[]>
    getById: (id: string) => Promise<Post>
}

export const postService: PostService = {
    list: () => api.get('/posts'),
    getById: id => api.get(`/post/${id}`),
}
