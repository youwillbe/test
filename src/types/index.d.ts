type PageRes<T> = {
    data: T[]
    meta: {
        pagination: {
            page: number
            pageCount: number
            pageSize: number
            total: number
        }
    }
}

type CommonRes<T> = {
    data: T
    meta: {}
}
