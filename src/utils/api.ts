import axios from 'axios'

export const BASE_URL = '/api'

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// api.interceptors.request.use(config => {
//     const token = localStorage.getItem('token')
//     if (token && config.headers) {
//         config.headers['x-access-token'] = token
//     }
//     return config
// })

api.interceptors.response.use(
    ({ data }) => {
        if (data.success) {
            return data.data
        } else {
            throw data.msg
        }
    },
    err => {
        return Promise.reject(err)
    }
)
