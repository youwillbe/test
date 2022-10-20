import { Loader } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { postService } from 'service/post'

export default function Post() {
    const { postId } = useParams()

    const { isLoading, data } = useQuery(['post', postId], () =>
        postService.getById(postId as string)
    )

    if (isLoading) {
        return (
            <div className='grid h-full place-items-center'>
                <Loader variant='dots' />
            </div>
        )
    }

    return (
        <div>
            <div>{data?.id}</div>
            <div>{data?.text}</div>
        </div>
    )
}
